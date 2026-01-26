import { useState, useRef } from "react";
import useHome from "./useHome";
import { toast } from "react-toastify";
import { LinkedinAd } from "@/interfaces";
import Cookies from "universal-cookie";
import { premiumDataLinkedIn } from "../../../constant";
import { useAuthContext } from "@/context/AuthContext";

export const useLinkedinAd = () => {
  const authCtx = useAuthContext();

  const formDataConfig = [
    {
      mode: "Standard",
      fields: [
        { label: "topic", name: "topicOfAd" },
        { label: "post_message", name: "moralOfAd" },
        // { label: 'Research', name: 'research' }
      ],
    },
    {
      mode: "Uplift Network",
      fields: [
        { label: "topic", name: "mainPoint" },
        { label: "post_message", name: "moral" },
      ],
    },
    {
      mode: "Reality Rundown",
      fields: [
        { label: "topic", name: "truth" },
        { label: "main_challenges", name: "challenges" },
        { label: "main_benefits", name: "bestPart" },
      ],
    },
    {
      mode: "Trust Gauge",
      fields: [
        { label: "villain_type", name: "firstType" },
        { label: "good_type", name: "secondType" },
      ],
    },
    {
      mode: "LinkedinPlaybook",
      fields: [
        { label: "topic", name: "howTo" },
        { label: "points_to_mention", name: "specificPoints" },
      ],
    },
    {
      mode: "List Master",
      fields: [
        { label: "topic", name: "discussion" },
        { label: "points_to_include", name: "moral" },
      ],
    },
    {
      mode: "Insightful journeys",
      fields: [
        { label: "topic", name: "topic" },
        { label: "post_message", name: "moral" },
      ],
    },
    {
      mode: "The “insight”",
      fields: [
        { label: "The topic of discussion", name: "topic" },
        { label: "Target Readers", name: "targetReaders" },
        { label: "Stats and info research material to backup", name: "stats" },
      ],
    },
    {
      mode: "Quick Catch",
      fields: [
        { label: "main_point", name: "point" },
        { label: "post_message", name: "moral" },
      ],
    },
    {
      mode: "Comment standard",
      fields: [
        {
          label: "Post to generate Linkedin comment for",
          name: "generatePost",
        },
        {
          label: "Any point to mention in the comment",
          name: "pointToMention",
        },
      ],
    },
    {
      mode: "The invaluable addition",
      fields: [
        {
          label: "Post to generate Linkedin comment for",
          name: "generatePost",
        },
        {
          label: "Any point to mention in the comment",
          name: "pointToMention",
        },
      ],
    },
    {
      mode: "The timeless advice",
      fields: [
        {
          label: "Post to generate Linkedin comment for",
          name: "generatePost",
        },
        {
          label: "Any point to mention in the comment",
          name: "pointToMention",
        },
      ],
    },
    {
      mode: "The proverb authority",
      fields: [
        {
          label: "Post to generate Linkedin comment for",
          name: "generatePost",
        },
        {
          label: "Any point to mention in the comment",
          name: "pointToMention",
        },
      ],
    },
    {
      mode: "The insightful discourse",
      fields: [
        {
          label: "Post to generate Linkedin comment for",
          name: "generatePost",
        },
        {
          label: "Any point to mention in the comment",
          name: "pointToMention",
        },
      ],
    },
  ];

  const readingTime = (text: string) => {
    const wordsPerMinute = 225;
    const words = text.trim()?.split(/\s+/);
    const wordCount = words?.length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  // const formatDate = (dateString: string) => {
  //   const months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];
  //   const [year, month, day] = dateString?.split("-");
  //   const monthIndex = parseInt(month, 10) - 1;

  //   let daySuffix;
  //   switch (day) {
  //     case "1":
  //     case "21":
  //     case "31":
  //       daySuffix = "st";
  //       break;
  //     case "2":
  //     case "22":
  //       daySuffix = "nd";
  //       break;
  //     case "3":
  //     case "23":
  //       daySuffix = "rd";
  //       break;
  //     default:
  //       daySuffix = "th";
  //   }

  //   const formattedDate = `${parseInt(day)}${daySuffix} ${
  //     months[monthIndex]
  //   }, ${year}`;

  //   return formattedDate;
  // };

  function formatDate(datetimeString: string) {
    const date = new Date(datetimeString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const cookies = new Cookies();
  const token = cookies.get("token");
  const textRef = useRef<any>();
  const gptEndpoint = `${process.env.NEXT_PUBLIC_API_URL}linkedin-ad/generate_gpt_response`;
  const gptEndpointComment = `${process.env.NEXT_PUBLIC_API_URL}linkedin-comment/generate_gpt_response`;

  const [commentingIsClicked, setCommentingIsClicked] = useState(false);
  const [allLinkedinCommentsLoaded, setAllLinkedinCommentsLoaded] =
    useState(false);

  const [allLinkedinAdsLoaded, setAllLinkedinAdsLoaded] = useState(false);
  const [allLinkedinAds, setAllLinkedinAds] = useState<Array<LinkedinAd>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [selectedMode, setSelectedMode] = useState("");
  const [showActions, setShowActions] = useState({
    display: false,
    id: null,
  });

  const [creditsCosting, setCreditsCosting] = useState(3);

  const [ABTestingValue, setABTestingValue] = useState("");

  const [linkedinAdDetails, setLinkedinAdDetails] = useState<LinkedinAd | null>(
    null,
  );
  const [linkedinCommentDetails, setLinkedinCommentDetails] = useState<any>();

  const [totalAds, setTotalAds] = useState(0);
  const [totalAdsInLastWeek, setTotalAdsInLastWeek] = useState(0);

  const [totalCredits, setTotalCredits] = useState(0);
  const [totalCreditsInLastWeek, setTotalCreditsInLastWeek] = useState(0);

  const [totalComments, setTotalComments] = useState(0);
  const [totalCommentsInLastWeek, setTotalCommentsInLastWeek] = useState(0);

  const [isPostGenerated, setIsPostGenerated] = useState(false);

  const [recentGeneratedAdId, setRecentGeneratedAdId] = useState("");
  const [visibilityLoader, setVisibilityLoader] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const {
    getAllAds,
    getAllStats,
    getDetail,
    updateResponse,
    addNewPost,
    changeVisibility,
  } = useHome();

  const handleAppropriateFormData = (event: any, currentMode: string) => {
    const modeConfig = formDataConfig.find(
      (config) => config.mode === currentMode,
    );

    if (!modeConfig) {
      return {};
    }

    const data: { [key: string]: string } = {};

    modeConfig.fields.forEach((field) => {
      data[field.label] = event.target[field.name].value;
    });

    return data;
  };

  const showCommentsFieldsHandler = () => {
    if (commentingIsClicked) {
      setSelectedMode("Standard");
      handleRadioSelect("Standard", false, 3);
    } else {
      setSelectedMode("Comment standard");
      handleRadioSelect("Comment standard", false, 0.1);
    }
    setCommentingIsClicked((state) => !state);
  };

  const handleNewAddPost = async (event: any) => {
    event.preventDefault();

    if (commentingIsClicked) {
      setIsLoading(true);
      setLoadingAnimation(true);
      const myData = handleAppropriateFormData(event, selectedMode);

      const formData = {
        feature_name: selectedMode,
        feature_fields: myData,
        post: event.target.generatePost.value,
        points_to_mention: event.target.pointToMention.value,
        credits_cost: creditsCosting,
      };
      const result = await addNewPost("linkedin-ad?mode=comment", formData);
      if (result.error) {
        setIsLoading(false);
        setLoadingAnimation(false);
        return;
      }
      const linkedinCommentId = result.id;
      setRecentGeneratedAdId(linkedinCommentId);

      const eventSource = new EventSource(
        `${gptEndpointComment}/${linkedinCommentId}/${token}`,
      );
      let myFinalGptResponse = "";
      eventSource.onmessage = (event) => {
        const responseObject = JSON.parse(event.data);
        if (responseObject.data !== null) {
          myFinalGptResponse += responseObject.data;

          textRef.current.innerText = myFinalGptResponse;
        } else {
        }
      };

      eventSource.onerror = (error) => {
        setLoadingAnimation(false);
        setIsLoading(false);
        setShowActions({
          display: true,
          id: linkedinCommentId,
        });
        eventSource.close();
        setIsPostGenerated(true);
        // save the response
        updateCommentGptResponse(
          linkedinCommentId,
          myFinalGptResponse,
          creditsCosting,
        );
      };
    } else {
      setIsLoading(true);
      setLoadingAnimation(true);

      const myData = handleAppropriateFormData(event, selectedMode);

      const formData = {
        feature_name: selectedMode,
        feature_fields: myData,
        credits_cost: creditsCosting,
      };
      const result = await addNewPost("linkedin-ad", formData);
      if (result.error) {
        setIsLoading(false);
        setLoadingAnimation(false);
        return;
      }

      const linkedinAdId = result.id;
      setRecentGeneratedAdId(linkedinAdId);

      const eventSource = new EventSource(
        `${gptEndpoint}/${linkedinAdId}/${token}`,
      );
      let myFinalGptResponse = "";
      eventSource.onmessage = (event) => {
        const responseObject = JSON.parse(event.data);
        if (responseObject.data !== null) {
          myFinalGptResponse += responseObject.data;

          textRef.current.innerText = myFinalGptResponse;
        } else {
        }
      };

      eventSource.onerror = (error) => {
        setLoadingAnimation(false);
        setIsLoading(false);
        setShowActions({
          display: true,
          id: linkedinAdId,
        });
        eventSource.close();
        setIsPostGenerated(true);
        // save the response
        updateGptResponse(
          linkedinAdId,
          textRef.current.innerHTML,
          creditsCosting,
        );
      };
      return linkedinAdId;
    }
  };

  const updateGptResponse = async (
    id: string,
    response: string,
    credits: number,
  ) => {
    const formData = {
      id: id,
      response: response,
      credits: credits,
    };

    const result = await updateResponse("linkedin-ad", formData);
    if (result.error) {
      toast("Unable to store response!", {
        type: "error",
      });
      return null;
    }
    authCtx.cutTotalCreditsHandler(creditsCosting);
    return result;
  };

  const updateCommentGptResponse = async (
    id: string,
    response: string,
    credits: number,
  ) => {
    const formData = {
      id: id,
      response: response,
      credits: credits,
    };

    const result = await updateResponse("linkedin-ad?mode=comment", formData);
    if (result.error) {
      toast("Unable to store response!", {
        type: "error",
      });
      return;
    }
    authCtx.cutTotalCreditsHandler(creditsCosting);
  };

  const getAllLinkedinPosts = async () => {
    setIsLoading(true);
    setAllLinkedinAdsLoaded(false);
    const response = await getAllAds("linkedin-ad");
    if (response.error) {
      toast("Unable to retrieve ads!", {
        type: "error",
      });
      return false;
    }
    setAllLinkedinAdsLoaded(true);
    setAllLinkedinAds(response.data);
    setIsLoading(false);
    return response.data;
  };

  const getAllLinkedinStats = async () => {
    const result = await getAllStats("linkedin-ad");
    if (result.error) {
      toast("Unable to retrieve stats!", {
        type: "error",
      });
      return false;
    }

    setTotalCredits(result.total_credits);
    setTotalCreditsInLastWeek(result.total_credits_last_week);

    setTotalAds(result.total_ads);
    setTotalAdsInLastWeek(result.total_ads_last_week);
    return true;
  };

  const handleGetLinkedinAd = async (id: string) => {
    const result = await getDetail("linkedin-ad", id);
    if (result.error) {
      toast("Unable to retrieve ads!", {
        type: "error",
      });
      return;
    }

    if (result.data.is_authenticated) {
      authCtx.validateToken();
    }

    setLinkedinAdDetails(result.data);
  };

  const handleGetLinkedinComment = async (id: string) => {
    const result = await getDetail("linkedin-ad?mode=comment", id);
    if (result.error) {
      toast("Unable to retrieve ads!", {
        type: "error",
      });
      return;
    }
    setLinkedinCommentDetails(result.data[0]);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: Array<LinkedinAd> = allLinkedinAds?.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const onPageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const [premiumFeatureDetail, setPremiumFeatureDetail] = useState<{
    display: boolean;
    value: string;
    description: string;
    example: string;
  }>({
    display: false,
    value: "",
    description: "",
    example: "",
  });

  const getDescriptionAndExample = (value: string) => {
    let description = "";
    let example = "";
    switch (value) {
      case "Standard":
        description = premiumDataLinkedIn.Standard.description;
        example = premiumDataLinkedIn.Standard.example;
        break;
      case "How to authority":
        description = premiumDataLinkedIn.HowToAuthority.description;
        example = premiumDataLinkedIn.HowToAuthority.example;
        break;
      case "Truth about x is":
        description = premiumDataLinkedIn.TheHiddenTruth.description;
        example = premiumDataLinkedIn.TheHiddenTruth.example;
        break;
      case "The Ultimate Comparison":
        description = premiumDataLinkedIn.TheUltimateComparison.description;
        example = premiumDataLinkedIn.TheUltimateComparison.example;
        break;
      case "Uplift Network":
        description = premiumDataLinkedIn.TheMotivationSpark.description;
        example = premiumDataLinkedIn.TheMotivationSpark.example;
        break;
      case "Insightful journeys":
        description = premiumDataLinkedIn.StoryTellingFinesse.description;
        example = premiumDataLinkedIn.StoryTellingFinesse.example;
        break;
      case "Listicle":
        description = premiumDataLinkedIn.Listicle.description;
        example = premiumDataLinkedIn.Listicle.example;
        break;
      case "The “insight”":
        description = premiumDataLinkedIn.Insight.description;
        example = premiumDataLinkedIn.Insight.example;
        break;
      case "The Goldfish Attention Accomodater":
        description = premiumDataLinkedIn.GoldFishAttentionSpan.description;
        example = premiumDataLinkedIn.GoldFishAttentionSpan.example;
        break;
      case "The invaluable addition":
        description = premiumDataLinkedIn.TheInvaluableAddition.description;
        example = premiumDataLinkedIn.TheInvaluableAddition.example;
        break;
      case "The timeless advice":
        description = premiumDataLinkedIn.TheTimelessAdvice.description;
        example = premiumDataLinkedIn.TheTimelessAdvice.example;
        break;
      case "The proverb authority":
        description = premiumDataLinkedIn.TheProverbAuthority.description;
        example = premiumDataLinkedIn.TheProverbAuthority.example;
        break;
      case "The insightful discourse":
        description = premiumDataLinkedIn.TheInsightfulDiscourse.description;
        example = premiumDataLinkedIn.TheInsightfulDiscourse.example;
        break;
      default:
        break;
    }

    return {
      description,
      example,
    };
  };
  const handleRadioSelect = (
    value: string,
    premium: boolean,
    credits: number,
  ) => {
    {
      setCreditsCosting(credits);
      if (premium) {
        if (authCtx.isPremium) {
          setSelectedMode(value);
          textRef.current.value = "";
          const { example, description } = getDescriptionAndExample(value);
          setPremiumFeatureDetail({
            display: true,
            value: value,
            example,
            description,
          });
        } else {
          openModal();
        }
      } else {
        const description = commentingIsClicked
          ? premiumDataLinkedIn.CommentStandard.description
          : premiumDataLinkedIn.Standard.description;
        const example = commentingIsClicked
          ? premiumDataLinkedIn.CommentStandard.example
          : premiumDataLinkedIn.Standard.example;
        setPremiumFeatureDetail({ display: true, value, example, description });
        setSelectedMode(value);
      }
    }
  };

  const visibilityHandler = async (status: string, id: any) => {
    setVisibilityLoader(true);
    const response = await changeVisibility("linkedin-ad", status, id);
    if (response.error) {
      setVisibilityLoader(false);
      return;
    }
    if (response.message === "Visibility status changed") {
      toast(`Visibility changed to ${status}`);
    }
    setVisibilityLoader(false);
  };

  return {
    isOpen,
    openModal,
    closeModal,
    isLoading,
    handleNewAddPost,
    getAllLinkedinPosts,
    allLinkedinCommentsLoaded,
    allLinkedinAds,
    linkedinCommentDetails,
    handleGetLinkedinAd,
    linkedinAdDetails,
    handleGetLinkedinComment,
    totalComments,
    totalCommentsInLastWeek,
    textRef,
    loadingAnimation,
    setLoadingAnimation,
    showActions,
    setShowActions,
    onPageChange,
    currentItems,
    currentPage,
    itemsPerPage,
    allLinkedinAdsLoaded,
    readingTime,
    formatDate,
    ABTestingValue,
    setABTestingValue,
    selectedMode,
    setSelectedMode,
    totalAds,
    totalAdsInLastWeek,
    getAllLinkedinStats,
    commentingIsClicked,
    showCommentsFieldsHandler,
    handleRadioSelect,
    premiumFeatureDetail,
    creditsCosting,
    totalCredits,
    totalCreditsInLastWeek,
    isPostGenerated,
    updateCommentGptResponse,
    updateGptResponse,
    recentGeneratedAdId,
    visibilityHandler,
    visibilityLoader,
  };
};
