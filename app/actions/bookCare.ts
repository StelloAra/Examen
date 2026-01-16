"use server";

import { redirect } from "next/navigation";

export async function bookCareAction(formData: FormData) {

  console.log("!!! FORMULÄRET HAR TAGITS EMOT AV SERVERN !!!");
  console.log("Namn:", formData.get("name"));
  console.log("Email:", formData.get("email"));
  console.log("Date:", formData.get("date"));
  console.log("Time:", formData.get("time"));
  console.log("Message:", formData.get("message"));
  console.log("Animal ID:", formData.get("animalId"));
  console.log("FormData:", formData);

  const baseUrl = process.env.ONEENTRY_PROJECT_URL;
  const token = process.env.ONEENTRY_TOKEN;

const data = {
    formIdentifier: "booking_care", 
    formModuleConfigId: 7, // Vi går tillbaka till 2:an som vi såg i URL:en
    moduleEntityIdentifier: "", 
    status: "sent",
    formData: {
      // Vi byter från en_US till sv_SE här
      en_US: [
        { marker: "name", value: formData.get("name"), type: "string" },
        { marker: "email", value: formData.get("email"), type: "string" },
        { marker: "b_date", value: formData.get("date"), type: "string" }, 
        { marker: "time", value: formData.get("time"), type: "string" },
        { 
          marker: "message", 
          value: [{ plainValue: formData.get("message") || "" }], 
          type: "text" 
        },
        { marker: "animal_id", value: Number(formData.get("animalId")), type: "integer" }
      ]
    }
  };

  let success = false;

  try {
    const response = await fetch(`${baseUrl}/api/content/form-data`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-app-token": token || "",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      success = true;
    } else {
      const errorData = await response.json();
      console.error("OneEntry API Error:", JSON.stringify(errorData, null, 2));
    }
  } catch (error) {
    console.error("Fetch failed:", error);
    throw new Error("Failed to book care.");
  }

  if (success) {
    // Sökväg bekräftad från din tidigare lyckade surfning
    redirect("/booking/care-success");
  }
}