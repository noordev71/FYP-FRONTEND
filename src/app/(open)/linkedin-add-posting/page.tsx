"use client";
import React, { Fragment } from "react";

import TextInput from "@/components/Utilities/TextInput";
import { useLinkedinAd } from "@/hooks/home/useLinkedinAd";
import AddPosting from "@/components/Utilities/AddPosting";
import Dropdown from "@/components/Utilities/Dropdown";

const LinkedinAdRadios = [
  {
    value: "Standard",
    isPremiumFeature: false,
    creditsCost: 3,
    tones: ["Standard"],
  },
  {
    value: "LinkedinPlaybook",
    isPremiumFeature: false,
    creditsCost: 5,
    tones: ["LinkedinPlaybook"],
  },
  {
    value: "Reality Rundown",
    isPremiumFeature: false,
    creditsCost: 3,
    tones: ["Reality Rundown"],
  },
  {
    value: "Trust Gauge",
    isPremiumFeature: false,
    creditsCost: 3,
    tones: ["Trust Gauge"],
  },
  {
    value: "Uplift Network",
    isPremiumFeature: false,
    creditsCost: 3,
    tones: ["Uplift Network"],
  },
  {
    value: "Insightful journeys",
    isPremiumFeature: false,
    creditsCost: 3,
    tones: ["Insightful journeys"],
  },
  {
    value: "List Master",
    isPremiumFeature: false,
    creditsCost: 3,
    tones: ["List Master"],
  },
  {
    value: "The “insight”",
    isPremiumFeature: false,
    creditsCost: 3,
    tones: ["Insight"],
  },
  {
    value: "Quick Catch",
    isPremiumFeature: false,
    creditsCost: 3,
    tones: ["Quick Catch"],
  },
];

const QuickCatchForm = [
  {
    name: "point",
    type: "text",
    label: "Primary Message/Argument to present",
    textArea: true,
    maxLength: 300,
    placeholder:
      "Life will keep knocking you down if you don't learn to stand tall on your own.",

    className: "shadow-sm",
    required: true,
    rows: 1,
    toolTipText: `Life will keep knocking you down if you don't learn to stand tall on your own.`,
  },
  {
    name: "moral",
    type: "text",
    label: "Fundamental Takeaways/Key Insights/Central Theme",
    textArea: true,
    maxLength: 800,
    placeholder:
      "E.g. Maturity is realising that the only person who can make a change in your life (for the better!) is yourself!",
    className: "shadow-sm",
    required: true,
    rows: 2,
    toolTipText: `Summarize the key takeaway or life lesson, e.g., "Maturity is realizing that the only person who can make a change in your life (for the better!) is yourself!"`,
  },
];

const InformationalForm = [
  {
    name: "topic",
    type: "text",
    label: "Main Topic",
    textArea: true,
    maxLength: 300,
    placeholder:
      "How AI is Revolutionizing Customer Support According to recent findings by TechCrunch",

    className: "shadow-sm",
    required: true,
    rows: 1,
    toolTipText: `How AI is Revolutionizing Customer Support According to recent findings by TechCrunch`,
  },
  {
    name: "targetReaders",
    type: "text",
    label: "Primary Audience",
    textArea: true,
    maxLength: 200,
    placeholder: "Business executives, operational managers, tech innovators",
    className: "shadow-sm",
    required: false,
    rows: 2,
    toolTipText: `Business executives, operational managers, tech innovators`,
  },
  {
    name: "stats",
    type: "text",
    label:
      "supporting research and analytical material to reinforce post arguments",
    textArea: true,
    maxLength: 10000,
    placeholder: "E.g. [upload studies, case studies, or relevant articles]",
    className: "shadow-sm",
    required: false,
    rows: 20,
    toolTipText: `upload studies, case studies, or relevant articles`,
  },
];

const LinkedinPlaybookForm = [
  {
    name: "howTo",
    type: "text",
    label: "Main Theme (the Steps to X)",
    textArea: true,
    maxLength: 200,
    placeholder:
      "How to Build a Strong Personal Brand on Social Media (in 3 steps)",

    className: "shadow-sm",
    required: true,
    rows: 1,
    toolTipText: `How to Build a Strong Personal Brand on Social Media (in 3 steps)`,
  },
  {
    name: "specificPoints",
    type: "text",
    label:
      "Essential elements to include/Critical aspects to address (or mention)",
    textArea: true,
    maxLength: 600,
    placeholder:
      "Define your unique value, consistently post, network with industry leaders.",
    className: "shadow-sm",
    required: false,
    rows: 2,
    toolTipText: `Define your unique value, consistently post, network with industry leaders.`,
  },
];

const ListMasterForm = [
  {
    name: "discussion",
    type: "text",
    label: "Main Theme",
    textArea: true,
    maxLength: 300,
    placeholder: "5 Simple Exercises to Boost Your Mental Health",

    className: "shadow-sm",
    required: true,
    rows: 1,
    toolTipText: `5 Simple Exercises to Boost Your Mental Health`,
  },
  {
    name: "moral",
    type: "text",
    label:
      "Essential elements to include/Critical aspects to address (or mention)",
    textArea: true,
    maxLength: 600,
    placeholder: "Breathing techniques, morning meditation, outdoor activities",
    className: "shadow-sm",
    required: false,
    rows: 1,
    toolTipText: `Breathing techniques, morning meditation, outdoor activities`,
  },
];

const UpliftNetwork = [
  {
    name: "mainPoint",
    type: "text",
    label: "LinkedIn Post Topic/LinkedIn Post Theme",
    textArea: true,
    maxLength: 300,
    placeholder:
      "Invest in self-growth today to lead your team more effectively tomorrow.",

    className: "shadow-sm",
    required: true,
    rows: 2,
    toolTipText: `Invest in self-growth today to lead your team more effectively tomorrow.`,
  },
  {
    name: "moral",
    type: "text",
    label: "Fundamental Takeaways/Key Insights/Central Theme",
    textArea: true,
    maxLength: 800,
    placeholder: "Consistent self-improvement fuels long-term success.",
    className: "shadow-sm",
    required: true,
    rows: 1,
    toolTipText: `Consistent self-improvement fuels long-term success.`,
  },
];

const StandardForm = [
  {
    name: "topicOfAd",
    type: "text",
    label: "LinkedIn Post Topic/LinkedIn Post Theme",
    textArea: true,
    maxLength: 250,
    placeholder: "Navigating Leadership in a Remote Work Era",

    className: "shadow-sm",
    required: true,
    rows: 1,
    toolTipText: `Navigating Leadership in a Remote Work Era`,
  },
  {
    name: "moralOfAd",
    type: "text",
    label: "Fundamental Takeaways/Key Insights/Central Theme",
    textArea: true,
    maxLength: 800,
    placeholder:
      "Effective leadership isn’t about control, but empowering others to achieve their best. When individuals feel supported, they are more motivated to contribute their best ideas and efforts.",
    className: "shadow-sm",
    required: true,
    rows: 3,
    toolTipText: `Effective leadership isn’t about control, but empowering others to achieve their best. When individuals feel supported, they are more motivated to contribute their best ideas and efforts.`,
  },
];
const InsightfulJourneysForm = [
  {
    name: "topic",
    type: "text",
    label: "Main Theme",
    textArea: true,
    maxLength: 300,
    placeholder:
      "I was at the park and noticed how the trees had already started shedding their leaves, signaling the change of seasons.",

    className: "shadow-sm",
    required: true,
    rows: 1,
    toolTipText: `I was at the park and noticed how the trees had already started shedding their leaves, signaling the change of seasons.`,
  },
  {
    name: "moral",
    type: "text",
    label: "Fundamental Takeaways/Key Insights/Central Theme",
    textArea: true,
    maxLength: 800,
    placeholder:
      "It reminded me that embracing change is a natural part of life, and every season brings new opportunities for growth.",
    className: "shadow-sm",
    required: true,
    rows: 2,
    toolTipText: `It reminded me that embracing change is a natural part of life, and every season brings new opportunities for growth.`,
  },
];
const TrustGaugeForm = [
  {
    name: "firstType",
    type: "text",
    label: "The Antagonist/Adversary",
    textArea: true,
    maxLength: 200,
    placeholder:
      "A customer with endless revisions for a logo design at a low price ($10)",

    className: "shadow-sm",
    required: true,
    rows: 1,
    toolTipText: `A customer with endless revisions for a logo design at a low price ($10)`,
  },
  {
    name: "secondType",
    type: "text",
    label: "The Desirable",
    textArea: true,
    maxLength: 200,
    placeholder:
      "A top-tier corporate account signing a yearly marketing retainer ($1000+)",
    className: "shadow-sm",
    required: true,
    rows: 2,
    toolTipText: `A top-tier corporate account signing a yearly marketing retainer ($1000+)`,
  },
];
const RealityRundownForm = [
  {
    name: "truth",
    type: "text",
    label: "Main topic/issue",
    textArea: true,
    maxLength: 200,
    placeholder:
      "The reality behind Fast Fashion - The hidden cost to our planet",

    className: "shadow-sm",
    required: true,
    rows: 1,
    toolTipText: `The reality behind Fast Fashion - The hidden cost to our planet`,
  },
  {
    name: "challenges",
    type: "text",
    label: "The resulting effects and implications",
    textArea: true,
    maxLength: 400,
    placeholder:
      "Excessive water usage, textile waste, exploitation of workers",
    className: "shadow-sm",
    required: false,
    rows: 2,
    toolTipText: `Excessive water usage, textile waste, exploitation of workers`,
  },
  {
    name: "bestPart",
    type: "text",
    label: "The benefits",
    textArea: true,
    maxLength: 400,
    placeholder: "Affordable clothing, job creation in developing nations",
    className: "shadow-sm",
    required: false,
    rows: 2,
    toolTipText: `Affordable clothing, job creation in developing nations`,
  },
];

export default function Page() {
  const {
    isLoading,
    handleNewAddPost,
    textRef,
    loadingAnimation,
    showActions,
    selectedMode,
    setSelectedMode,
    commentingIsClicked,
    showCommentsFieldsHandler,
    handleRadioSelect,
    premiumFeatureDetail,
    isOpen,
    closeModal,
    creditsCosting,
    isPostGenerated,
    updateCommentGptResponse,
    updateGptResponse,
    recentGeneratedAdId,
  } = useLinkedinAd();

  const dropdown = (
    <Dropdown
      options={
        LinkedinAdRadios.find((item) => item.value === selectedMode)?.tones ||
        []
      }
    />
  );

  const LinkedinAdFields =
    selectedMode === "Standard"
      ? StandardForm
      : selectedMode === "Uplift Network"
        ? UpliftNetwork
        : selectedMode === "Reality Rundown"
          ? RealityRundownForm
          : selectedMode === "Trust Gauge"
            ? TrustGaugeForm
            : selectedMode === "LinkedinPlaybook"
              ? LinkedinPlaybookForm
              : selectedMode === "List Master"
                ? ListMasterForm
                : selectedMode === "Insightful journeys"
                  ? InsightfulJourneysForm
                  : selectedMode === "The “insight”"
                    ? InformationalForm
                    : selectedMode === "Quick Catch"
                      ? QuickCatchForm
                      : [];

  const form =
    selectedMode === "" ? (
      ""
    ) : (
      <Fragment>
        {dropdown}
        {LinkedinAdFields.map((field) => {
          return (
            <TextInput
              key={field.name}
              name={field.name}
              type={field.type}
              label={field.label}
              textArea={field.textArea}
              rows={field.rows}
              maxLength={field.maxLength}
              required={field.required}
              placeholder={field.placeholder}
              className={field.className}
              toolTipText={field.toolTipText}
            />
          );
        })}
      </Fragment>
    );

  return (
    <Fragment>
      <AddPosting
        isPostGenerated={isPostGenerated}
        submitHandler={handleNewAddPost}
        formToRender={form}
        creditsCosting={creditsCosting}
        isLoading={isLoading}
        handleRadioSelect={handleRadioSelect}
        radioList={LinkedinAdRadios}
        selectedMode={selectedMode}
        responseRef={textRef}
        loadingAnimation={loadingAnimation}
        recentGeneratedAdId={recentGeneratedAdId}
        updateResponse={updateGptResponse}
        isOpen={isOpen}
        title="Linkedin"
        description="Select any linkedin feature to continue"
        closeModal={closeModal}
      />
    </Fragment>
  );
}
