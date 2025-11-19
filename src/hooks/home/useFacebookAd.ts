import { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { FacebookAd } from "../../interfaces";
import Cookies from "universal-cookie";

import { premiumDataFacebook } from "../../../constant";
import useHome from "@/hooks/home/useHome";
import { useAuthContext } from "@/context/AuthContext";

export const useFacebookAd = () => {
  const authCtx = useAuthContext();

  const readingTime = (text: string) => {
    if (!text || text.length === 0) {
      return 0;
    }
    const wordsPerMinute = 225;
    const words = text.trim()?.split(/\s+/);
    const wordCount = words?.length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return minutes;
  };

  function formatDate(datetimeString: string) {
    const date = new Date(datetimeString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are 0-based
    const day = String(date.getUTCDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  const cookies = new Cookies();
  const token = cookies.get("token");
  const textRef = useRef<any>("");
  const gptEndpoint = `${process.env.NEXT_PUBLIC_API_URL}/facebook-ad/generate_gpt_response`;

  const [allFacebookAdsLoaded, setAllFacebookAdsLoaded] = useState(false);
  const [allFacebookAds, setAllFacebookAds] = useState<Array<FacebookAd>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [loadingAnimation, setLoadingAnimation] = useState(false);
  const [showActions, setShowActions] = useState({
    display: false,
    id: null,
  });

  const [totalAds, setTotalAds] = useState(0);
  const [totalAdsInLastWeek, setTotalAdsInLastWeek] = useState(0);

  const [totalCredits, setTotalCredits] = useState(0);
  const [totalCreditsInLastWeek, setTotalCreditsInLastWeek] = useState(0);

  const [facebookAdDetails, setFacebookAdDetails] = useState<FacebookAd | null>(
    null
  );

  const [selectedMode, setSelectedMode] = useState("");

  const [isPostGenerated, setIsPostGenerated] = useState(false);
  const [recentGeneratedAdId, setRecentGeneratedAdId] = useState();
  const [visibilityLoader, setVisibilityLoader] = useState(false);

  const {
    addNewPost,
    getAllAds,
    getAllStats,
    getDetail,
    updateResponse,
    changeVisibility,
  } = useHome();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleNewAddPost = async (event: any) => {
    setIsLoading(true);
    setLoadingAnimation(true);

    const hidePremiumFeature = { ...premiumFeatureDetail };
    hidePremiumFeature.display = false;
    setPremiumFeatureDetail(hidePremiumFeature);
    event.preventDefault();
    let formData;
    if (selectedMode !== "ReviewBoost") {
      formData = {
        cta: event.target.cta.value,
        ideal_market: event.target.idealMarket.value,
        offering_uniqueness: event.target.offeringUniqueness.value,
        service_or_product: event.target.serviceOrProduct.value,
        feature_name: event.target.tone.value,
      };
    } else {
      formData = {
        cta: event.target.cta.value,
        ideal_market: event.target.idealMarket.value,
        review_on: event.target.review.value,
        reviewer: event.target.reviewer.value,
        reviewed_item: event.target.reviewedItem.value,
        feature_name: event.target.tone.value,
      };
    }

    const response = await addNewPost("facebook-ad", formData);
    if (response.error) {
      setIsLoading(false);
      setLoadingAnimation(false);
      return;
    }

    const fbAdId = response.id;

    const eventSource = new EventSource(`${gptEndpoint}/${fbAdId}/${token}`);
    let myFinalGptResponse = "";
    eventSource.onmessage = (event) => {
      console.log("NOW DATA", event.data);
      const responseObject = JSON.parse(event.data);
      if (responseObject.data && responseObject.data !== null) {
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
        id: fbAdId,
      });
      console.log("Error with SSE connection:", error);
      eventSource.close();
      setIsPostGenerated(true);
      setRecentGeneratedAdId(fbAdId);
      updateGptResponse(fbAdId, textRef.current.innerHTML);
    };

    return fbAdId;
  };

  const updateGptResponse = async (id: string, generatedResponse: string) => {
    const formData = {
      id: id,
      response: generatedResponse,
    };

    const response = await updateResponse("facebook-ad", formData);
    if (response.error) {
      toast("Unable to store response!", {
        type: "error",
      });
      return null;
    }
    return response;
  };

  const getAllFacebookPosts = async () => {
    setIsLoading(true);
    setAllFacebookAdsLoaded(false);
    const response = await getAllAds("facebook-ad");
    if (response.error) {
      setIsLoading(false);
      return;
    }

    setAllFacebookAdsLoaded(true);
    setAllFacebookAds(response.data);
    setIsLoading(false);
    return response.data;
  };

  const getAllFacebookStats = async () => {
    const response = await getAllStats("facebook-ad");
    if (response.error) {
      return;
    }

    setTotalAds(response.total_ads);
    setTotalAdsInLastWeek(response.total_ads_last_week);
    setTotalCredits(response.total_credits);
    setTotalCreditsInLastWeek(response.total_credits_last_week);
    return true;
  };

  const handleGetFacebookAdDetails = async (id: string) => {
    const response = await getDetail("facebook-ad", id);
    if (response.error) {
      return;
    }

    if (response.data.is_authenticated) {
      authCtx.validateToken();
    }

    setFacebookAdDetails(response.data);
  };

  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 9;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems: Array<FacebookAd> = allFacebookAds?.slice(
    indexOfFirstItem,
    indexOfLastItem
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
        description = premiumDataFacebook.Standard.description;
        example = premiumDataFacebook.Standard.example;
        break;
      case "The bullet digestion":
        description = premiumDataFacebook.Listicle.description;
        example = premiumDataFacebook.Listicle.example;
        break;
      case "The suspense builder":
        description = premiumDataFacebook.SuspenseBuilder.description;
        example = premiumDataFacebook.SuspenseBuilder.example;
        break;
      case "The FOMO factory":
        description = premiumDataFacebook.FomoBuilder.description;
        example = premiumDataFacebook.FomoBuilder.example;
        break;
      case "The social proof":
        description = premiumDataFacebook.Leverager.description;
        example = premiumDataFacebook.Leverager.example;
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
      if (premium) {
        if (authCtx.isPremium) {
          textRef.current.value = "";
          const { example, description } = getDescriptionAndExample(value);
          setPremiumFeatureDetail({
            display: true,
            value: value,
            example,
            description,
          });
          setSelectedMode(value);
        } else {
          openModal();
        }
      } else {
        textRef.current.value = "";
        const { example, description } = getDescriptionAndExample(value);
        setPremiumFeatureDetail({
          display: true,
          value: value,
          example,
          description,
        });
        setSelectedMode(value);
      }
    }
  };
  const visibilityHandler = async (status: string, id: any) => {
    setVisibilityLoader(true);
    const response = await changeVisibility("facebook-ad", status, id);
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
    getAllFacebookPosts,
    allFacebookAds,
    handleGetFacebookAdDetails,
    facebookAdDetails,
    textRef,
    loadingAnimation,
    setLoadingAnimation,
    showActions,
    setShowActions,
    onPageChange,
    currentItems,
    currentPage,
    itemsPerPage,
    allFacebookAdsLoaded,
    readingTime,
    formatDate,
    totalAds,
    totalAdsInLastWeek,
    getAllFacebookStats,
    handleRadioSelect,
    premiumFeatureDetail,
    selectedMode,
    totalCredits,
    totalCreditsInLastWeek,
    isPostGenerated,
    recentGeneratedAdId,
    updateGptResponse,
    visibilityHandler,
    visibilityLoader,
  };
};
