import Cookies from "universal-cookie";
import { HomeAdapter } from "@/adapter/home.adapter";
import { useState, useRef } from "react";
import useHome from "./useHome";
import { toast } from "react-toastify";
import { useAuthContext } from "@/context/AuthContext";
import { premiumDataEmail } from "../../../constant";
import { EmailAd } from "@/interfaces";

const useEmail = () => {
  const cookie = new Cookies();
  const token = cookie.get("token");
  const textRef = useRef<any>();
  const gptEndpoint = `${process.env.NEXT_PUBLIC_API_URL}email-marketing/generate_gpt_response`;

  const authCtx = useAuthContext();

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [allEmailsLoaded, setAllEmailsLoaded] = useState(false);

  const [allEmails, setAllEmails] = useState<Array<EmailAd>>([]);

  const [emailDetails, setEmailDetails] = useState<any>();

  const [selectedMode, setSelectedMode] = useState("");
  const [creditsCosting, setCreditsCosting] = useState(5);

  const [totalAds, setTotalAds] = useState(0);
  const [totalAdsInLastWeek, setTotalAdsInLastWeek] = useState(0);

  const [totalCredits, setTotalCredits] = useState(0);
  const [totalCreditsInLastWeek, setTotalCreditsInLastWeek] = useState(0);

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

  const [showActions, setShowActions] = useState({
    display: false,
    id: null,
  });

  const [isPostGenerated, setIsPostGenerated] = useState(false);
  const [recentGeneratedAdId, setRecentGeneratedAdId] = useState();
  const [visibilityLoader, setVisibilityLoader] = useState(false);

  const {
    getAllAds,
    getDetail,
    getAllStats,
    updateResponse,
    addNewPost,
    changeVisibility,
  } = useHome();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
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

  const getAllEmailData = async () => {
    setIsLoading(true);

    const response = await getAllAds("email-marketing");
    if (response.error) {
      setIsLoading(false);
      return;
    }
    setAllEmails(response.data);
    setAllEmailsLoaded(true);
    setIsLoading(false);
    return response.data;
  };

  const getEmailStats = async () => {
    const response = await getAllStats("email-marketing");
    if (response.error) {
      return;
    }

    setTotalAds(response.total_ads);
    setTotalAdsInLastWeek(response.total_ads_last_week);

    setTotalCredits(response.total_credits);
    setTotalCreditsInLastWeek(response.total_credits_last_week);

    return true;
  };

  const getEmailDetail = async (id: any) => {
    const response = await getDetail("email-marketing", id);
    if (response.error) {
      return;
    }

    if (response.data.is_authenticated) {
      authCtx.validateToken();
    }

    setEmailDetails(response.data);
  };

  const updateGptResponse = async (
    id: any,
    generatedResponse: any,
    credits: number
  ) => {
    const formData = {
      id: id,
      response: generatedResponse,
      credits: credits,
    };

    const response = await updateResponse("email-marketing", formData);
    if (response.error) {
      toast("Unable to store response!", {
        type: "error",
      });
      return null;
    }
    authCtx.cutTotalCreditsHandler(creditsCosting);
    return response;
  };

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    setLoadingAnimation(true);
    event.preventDefault();
    const formData = {
      to_pitch: event.target.pitch.value,
      our_offering: event.target.offering.value,
      prospect_niche: event.target.niche.value,
      prospect_company: event.target.prospectCompany.value,
      prospect_name: event.target.prospectName.value,
      prospect_contact_about: event.target.about.value,
      cta: event.target.callToAction.value,
      feature_name: event.target.tone.value,
      credits_cost: creditsCosting,
    };

    const response = await addNewPost("email-marketing", formData);

    if (response.error) {
      setIsLoading(false);
      setLoadingAnimation(false);
      return;
    }

    const emailId = response.id;

    const eventSource = new EventSource(`${gptEndpoint}/${emailId}/${token}`);
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
        id: emailId,
      });
      eventSource.close();
      // save the response
      setIsPostGenerated(true);
      setRecentGeneratedAdId(emailId);
      updateGptResponse(emailId, textRef.current.innerHTML, creditsCosting);
    };
    return emailId;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = allEmails?.slice(indexOfFirstItem, indexOfLastItem);
  const onPageChange = (pageNumber: any) => {
    setCurrentPage(pageNumber);
  };

  const getDescriptionAndExample = (value: string) => {
    let description = "";
    let example = "";
    switch (value) {
      case "Standard":
        description = premiumDataEmail.Standard.description;
        example = premiumDataEmail.Standard.example;
        break;
      case "Casual convo starter":
        description = premiumDataEmail.CasualConvoStarter.description;
        example = premiumDataEmail.CasualConvoStarter.example;
        break;
      case "The Goldfish attention span":
        description = premiumDataEmail.TheGoldFishAttentionSpan.description;
        example = premiumDataEmail.TheGoldFishAttentionSpan.example;
        break;
      case "Long form (Outreach Copy)":
        description = premiumDataEmail.LongFormOutreach.description;
        example = premiumDataEmail.LongFormOutreach.example;
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
    credits: number
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
        const description = premiumDataEmail.Standard.description;
        const example = premiumDataEmail.Standard.example;
        setPremiumFeatureDetail({ display: true, value, example, description });

        setSelectedMode(value);
      }
    }
  };

  const visibilityHandler = async (status: string, id: any) => {
    setVisibilityLoader(true);

    const response = await changeVisibility("email-marketing", status, id);
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
    getAllEmailData,
    isLoading,
    isOpen,
    openModal,
    closeModal,
    handleSubmit,
    totalAds,
    totalAdsInLastWeek,
    loadingAnimation,
    currentItems,
    allEmails,
    allEmailsLoaded,
    currentPage,
    onPageChange,
    itemsPerPage,
    getEmailDetail,
    emailDetails,
    textRef,
    showActions,
    setShowActions,
    handleRadioSelect,
    selectedMode,
    creditsCosting,
    getEmailStats,
    premiumFeatureDetail,
    formatDate,
    totalCredits,
    totalCreditsInLastWeek,
    isPostGenerated,
    recentGeneratedAdId,
    updateGptResponse,
    visibilityLoader,
    visibilityHandler,
  };
};

export default useEmail;
