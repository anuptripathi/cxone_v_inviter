export const config = {
  logoPath:
    process.env.NEXT_PUBLIC_LOGO_PATH ||
    "e9a34b33-0923-45d2-aa4d-929295bef4b8.png",
  nicBusNumber: process.env.NEXT_PUBLIC_NIC_BUS_NUMBER || "4604930",
  clusterNiC: process.env.NEXT_PUBLIC_CLUSTER_NIC || "e32",
  videoSignalerURL:
    process.env.NEXT_PUBLIC_VIDEO_SIGNALER_URL ||
    "https://home-e32.niceincontact.com/inContact/Manage/Scripts/Spawn.aspx?scriptName=Surfly_Signaler&bus_no=4604930&scriptId=273896001&skill_no=25161997&p1=&p2=&p3=&p4=&p5=&Guid=a8da6e64-6193-4866-b7db-419114c1d374",
  twilioBaseURL:
    process.env.NEXT_PUBLIC_TWILIO_BASE_URL ||
    "https://video-app-5022-7337-dev.twil.io?passcode=77753750227337",
  skillNumberMap: {
    English: "25162081",
    Hindi: "25162082",
    German: "25162083",
    Spanish: "25162084",
  },
};
