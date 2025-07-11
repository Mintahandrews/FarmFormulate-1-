import { useState, useEffect } from "react";

type TranslationKey = string;
type LanguageCode = string;

interface Translations {
  [key: LanguageCode]: {
    [key: TranslationKey]: string;
  };
}

// Language names in their native scripts
const languageNames: Record<string, string> = {
  en: "English",
  tw: "Twi",
  ew: "Eʋegbe",
  ga: "Ga",
  da: "Dagbanli",
  ha: "Hausa",
};

// Mock translations - in a real app, these would come from i18n files
const translations: Translations = {
  en: {
    // App Navigation
    dashboard: "Dashboard",
    forms: "Forms",
    analytics: "Analytics",
    help: "Help",
    login: "Log In",
    signup: "Sign Up",
    getStarted: "Get Started",
    createForm: "Create Form",

    // Language
    selectLanguage: "Select Language",
    changeLanguage: "Change Language",

    // Features
    feature1: "Easy-to-use form builder",
    feature2: "Advanced analytics dashboard",
    feature3: "Secure data collection",

    // Theme
    switchToLightMode: "Switch to light mode",
    switchToDarkMode: "Switch to dark mode",

    // SEO
    metaDescription:
      "FarmFormulate - Create custom forms for agricultural data collection",

    // Landing Page
    landingHeroTitle: "Transform Your Agricultural Data Collection",
    landingHeroSubtitle:
      "Create beautiful, mobile-friendly forms for agricultural research and data collection in minutes. No coding required.",

    // Features
    featuresTitle: "Powerful Features for Agricultural Research",
    featuresSubtitle:
      "Everything you need to collect, manage, and analyze agricultural data",
    feature1Title: "Easy Form Building",
    feature1Desc:
      "Drag and drop interface to create custom forms for any agricultural research need",
    feature2Title: "Multi-language Support",
    feature2Desc:
      "Create forms in multiple local languages to reach all farmers",
    feature3Title: "Offline Capable",
    feature3Desc:
      "Collect data even without internet connection and sync when back online",
    feature4Title: "Real-time Analytics",
    feature4Desc:
      "Get insights from your data with powerful visualization tools",

    // CTA Section
    ctaTitle: "Ready to streamline your agricultural data collection?",
    ctaSubtitle:
      "Join thousands of researchers and extension officers using our platform to gather better agricultural data",
    watchDemo: "Watch Demo",

    // Form Builder
    intelligentFormBuilder: "Intelligent Form Builder",
    formBuilderDescription:
      "Describe the agricultural survey you need, and our AI will generate a tailored form with appropriate validation rules.",
    enterPrompt: "Enter your prompt...",
    generateForm: "Generate Form",
    generating: "Generating...",
    tryExamples: "Try these examples:",
    editForm: "Edit Form",
    previewForm: "Preview",
    exportJSON: "Export JSON",
    untitledForm: "Untitled Form",
    addDescription: "Add a description for your form",
    addField: "Add Field",
    text: "Text",
    number: "Number",
    select: "Dropdown",
    radio: "Radio",
    checkbox: "Checkbox",
    date: "Date",
    submitForm: "Submit Form",
    downloadJSON: "Download JSON",
    formSchemaJSON: "Form Schema JSON",
    createSurvey:
      "Create a survey to assess maize yield and pest impact in Bono East",
    buildForm:
      "Build a form to collect data on irrigation practices for rice farmers",
    generateQuestionnaire:
      "Generate a questionnaire about market access for smallholder farmers",

    // Common
    loading: "Loading...",
    dataQuality: "Data Quality",
    settings: "Settings",
    cancel: "Cancel",
    save: "Save",
    required: "Required",
    optional: "Optional",
    error: "Error",
    fieldType: "Field Type",
    label: "Label",
    helpText: "Help Text (Optional)",
    options: "Options",
    addOption: "Add new option",
    placeholder: "Placeholder",
    minValue: "Min Value",
    maxValue: "Max Value",
    requiredField: "Required field",
    errorMessage: "Error Message",
    fixIssues: "Please fix the following issues:",
    saveField: "Save Field",
  },
  tw: {
    dashboard: "Dashbɔɔd",
    forms: "Fɔɔm",
    analytics: "Dwumadi hwɛ",
    help: "Mmoa",
    createForm: "Yɛ Fɔɔm Foforɔ",
    selectLanguage: "Yi kasa",
    intelligentFormBuilder: "Nyansapɔ Fɔɔm Yɛfo",
    formBuilderDescription:
      "Kyerɛkyerɛ kuadwuma survey a wohia, na yɛn AI bɛyɛ fɔɔm a ɛfata de mmara a ɛfata.",
    enterPrompt: "Hyɛ wo nkra...",
    generateForm: "Yɛ Fɔɔm",
    generating: "Ɛreyɛ...",
    tryExamples: "Sɔ saa nhwɛso yi:",
    editForm: "Sesa Fɔɔm",
    previewForm: "Nhwɛso",
    exportJSON: "Export JSON",
    untitledForm: "Fɔɔm A Ɛnni Din",
    addDescription: "Fa nkyerɛkyerɛmu ka wo fɔɔm ho",
    addField: "Fa field ka ho",
    text: "Nkyerɛwee",
    number: "Nɔmba",
    select: "Dropdown",
    radio: "Radio",
    checkbox: "Checkbox",
    date: "Da",
    submitForm: "Fa Fɔɔm Kɔ",
    downloadJSON: "Download JSON",
    formSchemaJSON: "Form Schema JSON",
    createSurvey:
      "Yɛ survey sɛnea wobesusuw aburoɔ nneɛma ne mmoa a ɛde ɔhaw ba wɔ Bono Apuei",
    buildForm:
      "Yɛ fɔɔm a wɔde bɛboaboa nsuo ho dwumadie ho nsɛm ano wɔ ɔmoo adwadifoɔ mu",
    generateQuestionnaire: "Yɛ nsɛmmisa a ɛfa adwadie ho wɔ kuafo nkumaa mu",
    loading: "Ɛretwɛn AgriNova AI...",
    dataQuality: "Data Nyinaa",
    settings: "Nhyehyɛe",
    cancel: "Gyae",
    save: "Sie",
    required: "Ehia",
    optional: "Ɛho nhia",
    error: "Mfomsoɔ",
    fieldType: "Field Type",
    label: "Label",
    helpText: "Mmoa Nkyerɛwee (Optional)",
    options: "Options",
    addOption: "Fa option foforɔ ka ho",
    placeholder: "Placeholder",
    minValue: "Botae Ketewa",
    maxValue: "Botae Kɛseɛ",
    requiredField: "Field a ɛhia",
    errorMessage: "Mfomsoɔ Nkra",
    fixIssues: "Yɛ saa nsɛm yi ho adwuma:",
    saveField: "Sie Field",
  },
  ew: {
    dashboard: "Dashboard",
    forms: "Fɔmwɔ",
    analytics: "Nudzɔdzɔ",
    help: "Kpekpe",
    createForm: "Wɔ Form Yeye",
    selectLanguage: "Tia gbe",
    intelligentFormBuilder: "Nunya Fɔm Wɔla",
    formBuilderDescription:
      "Ŋlɔ agbledede ŋu dodokpɔ si hiã wò, eye míaƒe AI awɔ fɔm si sɔ kple kpɔɖeŋu nyuitɔwo.",
    enterPrompt: "Ŋlɔ wò nudɔdrɔ̃...",
    generateForm: "Wɔ Fɔm",
    generating: "Ewɔm...",
    tryExamples: "Te kpɔɖeŋu siawo kpɔ:",
    editForm: "Trɔ Asi le Fɔm Ŋu",
    previewForm: "Kpɔ Ɖa",
    exportJSON: "Export JSON",
    untitledForm: "Fɔm Si Mele Ŋkɔ Na O",
    addDescription: "Tsɔ numeɖeɖe kpe wò fɔm ŋu",
    addField: "Tsɔ field kpe ɖe eŋu",
    text: "Nuŋɔŋlɔ",
    number: "Xexlẽme",
    select: "Dropdown",
    radio: "Radio",
    checkbox: "Checkbox",
    date: "Ŋkeke",
    submitForm: "Ɖo Fɔm Ɖa",
    downloadJSON: "Download JSON",
    formSchemaJSON: "Form Schema JSON",
    createSurvey:
      "Wɔ dodokpɔ si atsɔ akpɔ bli nukuwo kple nudzodzoewo ƒe nuwuwu le Bono Ɣedzeƒe",
    buildForm:
      "Tu fɔm si atsɔ aƒo tsiɖeɖe dɔwɔnawo ƒe nyatakakawo nu ƒu le mɔlukudzilawo dome",
    generateQuestionnaire:
      "Wɔ biabiagbalẽ tso asi dzedze ɖe asiwo ŋu na agblenala suewo",
    loading: "Ele AgriNova AI tsɔm vɛ...",
    dataQuality: "Nyatakakawo ƒe Nyonyo",
    settings: "Ɖoɖowo",
    cancel: "Ɖe Asi Le Eŋu",
    save: "Dzra Ɖo",
    required: "Ehiã",
    optional: "Mehiã o",
    error: "Vodada",
    fieldType: "Field Ƒomevi",
    label: "Dzesidede",
    helpText: "Kpekpe Nuŋɔŋlɔ (Optional)",
    options: "Tatiawo",
    addOption: "Tsɔ tatia yeye kpe ɖe eŋu",
    placeholder: "Teƒenɔla",
    minValue: "Xexlẽme Suetɔ",
    maxValue: "Xexlẽme Gãtɔ",
    requiredField: "Field si hiã",
    errorMessage: "Vodada Gbedeasi",
    fixIssues: "Taflatse dzra nyawo ɖo:",
    saveField: "Dzra Field Ɖo",
  },
  ga: {
    dashboard: "Dashboard",
    forms: "Fɔmwɔ",
    analytics: "Nitsɔɔmɔ Nibii",
    help: "Yelikɛbuamɔ",
    createForm: "Bɔɔ Fɔm Hee",
    selectLanguage: "Hala wiemɔ",
    intelligentFormBuilder: "Nilee Fɔm Feelɔ",
    formBuilderDescription:
      "Tsɔɔmɔ okwaahe sɔɔlɔmɔ ni ohe, ni wɔ AI baafee fɔm ni sa kɛ mla ni sa.",
    enterPrompt: "Ŋma onitsumɔ...",
    generateForm: "Fee Fɔm",
    generating: "Efeem...",
    tryExamples: "Ka nɔkwɛmɔnii nɛɛ akwɛ:",
    editForm: "Tsakemɔ Fɔm",
    previewForm: "Kwɛmɔ",
    exportJSON: "Export JSON",
    untitledForm: "Fɔm Ni Bɛ Gbɛi",
    addDescription: "Kɛ mlitsamɔ wo fɔm lɛ he",
    addField: "Kɛ field fata he",
    text: "Niŋmamɔ",
    number: "Yibɔ",
    select: "Dropdown",
    radio: "Radio",
    checkbox: "Checkbox",
    date: "Gbi",
    submitForm: "Kɛ Fɔm Lɛ Hã",
    downloadJSON: "Download JSON",
    formSchemaJSON: "Form Schema JSON",
    createSurvey:
      "Fee sɔɔlɔmɔ ni akwɛmɔ abele ninumɔi kɛ kooloi ni kɛ naagbai ba yɛ Bono Bokagbɛ",
    buildForm:
      "Fee fɔm ni akɛ nu he saamɔ nitsumɔi ahe saji aŋɔɔ yɛ shikutsei ateŋ",
    generateQuestionnaire:
      "Fee saji bibimɔi yɛ jara nɔmɔ he kɛha okwaahenii bibii",
    loading: "Ekɛ AgriNova AI lɛ miiba...",
    dataQuality: "Saji Ahe Nɔmɔ",
    settings: "Ntoyatsɛmɔi",
    cancel: "Kwamɔ",
    save: "Buamɔ",
    required: "Esa",
    optional: "Esaaa",
    error: "Tɔmɔ",
    fieldType: "Field Srɔto",
    label: "Okadi",
    helpText: "Yelikɛbuamɔ Niŋmamɔ (Optional)",
    options: "Hiɛnyamɔi",
    addOption: "Kɛ hiɛnyamɔ hee fata he",
    placeholder: "Nɔsaa",
    minValue: "Yibɔ Fɛɛ Bibioo",
    maxValue: "Yibɔ Fɛɛ Agbo",
    requiredField: "Field ni esa",
    errorMessage: "Tɔmɔ Shɛɛ",
    fixIssues: "Ofainɛ saa saji nɛɛ:",
    saveField: "Buamɔ Field",
  },
  da: {
    dashboard: "Dashboard",
    forms: "Forms",
    analytics: "Analytics",
    help: "Sɔŋsim",
    createForm: "Nam Form Paali",
    selectLanguage: "Gahim yɛligu",
    intelligentFormBuilder: "Baŋsim Form Maana",
    formBuilderDescription:
      "Wuhi pukparigu din a bɔri, ka ti AI ni maa form ni tuɣiya ni validator kura.",
    enterPrompt: "Kpɛli a yɛltɔɣa...",
    generateForm: "Maa Form",
    generating: "Maabu...",
    tryExamples: "Makpa nna biɛla:",
    editForm: "Mali Form",
    previewForm: "Nya",
    exportJSON: "Export JSON",
    untitledForm: "Form Din Ka Yuli",
    addDescription: "Pahimi baŋsim a form maa zuɣu",
    addField: "Pahimi field",
    text: "Sɔŋ",
    number: "Lam",
    select: "Dropdown",
    radio: "Radio",
    checkbox: "Checkbox",
    date: "Dahinli",
    submitForm: "Tum Form",
    downloadJSON: "Download JSON",
    formSchemaJSON: "Form Schema JSON",
    createSurvey:
      "Maa survey ni nya kawana di mini tiŋa biɛri Bono Wulana puuni",
    buildForm:
      "Maa form ni laɣim kom mini mui maani puuni lahabali ni kɔm duɣuribi sani",
    generateQuestionnaire: "Maa bukaata lahabali pukparibi shaani",
    loading: "Gbebu AgriNova AI...",
    dataQuality: "Lahabali Viɛnyɛliŋga",
    settings: "Sabi Kura",
    cancel: "Naai",
    save: "Gbibi",
    required: "Bɔri",
    optional: "Ku bɔri",
    error: "Galibu",
    fieldType: "Field Bulli",
    label: "Label",
    helpText: "Sɔŋsim Lahabali (Optional)",
    options: "Options",
    addOption: "Pahimi option palli",
    placeholder: "Shee zaani",
    minValue: "Lam Biɛla",
    maxValue: "Lam Titali",
    requiredField: "Field din bɔri",
    errorMessage: "Galibu Lahabali",
    fixIssues: "Mali nna lahabali maa:",
    saveField: "Gbibi Field",
  },
  ha: {
    dashboard: "Dashboard",
    forms: "Forms",
    analytics: "Analytics",
    help: "Taimako",
    createForm: "Ƙirƙiri Sabon Form",
    selectLanguage: "Zaɓi harshe",
    intelligentFormBuilder: "Mai Hikima Form Builder",
    formBuilderDescription:
      "Bayani game da binciken noma da kake bukata, kuma AI namu zai samar da tsari mai dacewa tare da ka'idojin ingantawa da suka dace.",
    enterPrompt: "Shigar da buƙatarka...",
    generateForm: "Samar da Form",
    generating: "Ana sarmarwa...",
    tryExamples: "Gwada waɗannan misalai:",
    editForm: "Gyara Form",
    previewForm: "Dubawa",
    exportJSON: "Export JSON",
    untitledForm: "Form Ba Tare Da Suna Ba",
    addDescription: "Ƙara bayani game da formarka",
    addField: "Ƙara field",
    text: "Rubutu",
    number: "Lambar",
    select: "Dropdown",
    radio: "Radio",
    checkbox: "Checkbox",
    date: "Kwanan wata",
    submitForm: "Aika Form",
    downloadJSON: "Download JSON",
    formSchemaJSON: "Form Schema JSON",
    createSurvey:
      "Ƙirƙiri bincike don tantance yawan masara da tasirin ƙwari a Bono Gabas",
    buildForm:
      "Gina form don tattara bayanan ayyukan banruwa don manoman shinkafa",
    generateQuestionnaire:
      "Samar da tambayoyi game da samun shiga kasuwa don manoma kanana",
    loading: "Ana loda AgriNova AI...",
    dataQuality: "Ingancin Bayanan",
    settings: "Saituna",
    cancel: "Soke",
    save: "Ajiye",
    required: "Ana bukata",
    optional: "Na zaɓi",
    error: "Kuskure",
    fieldType: "Field Type",
    label: "Label",
    helpText: "Rubutun Taimako (Optional)",
    options: "Zaɓuɓɓuka",
    addOption: "Ƙara sabon zaɓi",
    placeholder: "Placeholder",
    minValue: "Ƙananan Ƙima",
    maxValue: "Mafi Girman Ƙima",
    requiredField: "Field da ake bukata",
    errorMessage: "Saƙon Kuskure",
    fixIssues: "Da fatan a gyara waɗannan matsaloli:",
    saveField: "Ajiye Field",
  },
};

export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState<LanguageCode>(() => {
    // Get saved language from localStorage or default to 'en'
    return (localStorage.getItem("selectedLanguage") as LanguageCode) || "en";
  });

  const t = (key: TranslationKey): string => {
    return (
      translations[currentLanguage]?.[key] || translations["en"][key] || key
    );
  };

  const changeLanguage = (newLanguage: LanguageCode) => {
    setCurrentLanguage(newLanguage);
    localStorage.setItem("selectedLanguage", newLanguage);
    document.documentElement.lang = newLanguage; // Update HTML lang attribute

    // Force re-render of all components that use translations
    const event = new CustomEvent("languageChanged", {
      detail: { language: newLanguage },
    });
    window.dispatchEvent(event);

    // Update meta tags for SEO
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        translations[newLanguage].metaDescription || ""
      );
    }
  };

  // Set initial HTML lang attribute
  useEffect(() => {
    document.documentElement.lang = currentLanguage;
  }, []);

  return {
    t,
    changeLanguage,
    currentLanguage,
    languageNames,
    availableLanguages: Object.keys(languageNames) as LanguageCode[],
  };
};
