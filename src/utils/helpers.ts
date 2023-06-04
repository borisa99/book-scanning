import type { Book } from "@prisma/client";

export const convertToCsvArray = (books: (Book | null)[]) => {
  const csvString: string[][] = [
    [
      "*Action(SiteID=US|Country=US|Currency=USD|Version=1193|CC=UTF-8)",
      "Custom Label",
      "*Category",
      "*Title",
      "*ConditionID",
      "*C:Author",
      "*C:Book Title",
      "*C:Language",
      "*C:Topic",
      "C:Book Series",
      "*C:Genre",
      "*C:Publisher",
      "C:Original Language",
      "*C:Publication Year",
      "*C:Narrative Type",
      "C:Character",
      "*C:Type",
      "C:Edition",
      "C:Country/Region of Manufacture",
      "C:Features",
      "*C:Intended Audience",
      "C:Ex Libris",
      "C:Personalise",
      "C:Signed By",
      "C:Inscribed",
      "C:Personalised",
      "C:Vintage",
      "C:Signed",
      "C:Literary Movement",
      "C:Era",
      "C:Illustrator",
      "C:Time Period Manufactured",
      "C:Item Height",
      "C:Item Length",
      "C:Item Weight",
      "C:Item Width",
      "C:Number of Pages",
      "C:Unit Quantity",
      "PicURL",
      "*Description",
      "*Format",
      "*Duration",
      "*StartPrice",
      "BuyItNowPrice",
      "*Quantity",
      "PayPalAccepted",
      "PayPalEmailAddress",
      "ImmediatePayRequired",
      "PaymentInstructions",
      "*Location",
      "ShippingType",
      "ShippingService-1:Option",
      "ShippingService-1:Cost",
      "*DispatchTimeMax",
      "*ReturnsAcceptedOption",
      "ReturnsWithinOption",
      "RefundOption",
      "ShippingCostPaidByOption",
    ],
  ];

  books.forEach((item) => {
    if (item && item.dimensions) {
      const regex =
        /Height: ([\d.]+) Inches, Length: ([\d.]+) Inches(?:, Weight: ([\d.]+) Pounds)?, Width: ([\d.]+) Inches/;
      const matches = item.dimensions.match(regex);

      csvString.push([
        "Add",
        "SKU",
        "261186",
        `"${
          item.title_long !== null
            ? item.title_long.replace(/"/g, '""')
            : "Unknown"
        }"`,
        "1000",
        `"${
          item.authors !== null
            ? item.authors
                .replace(/"/g, "")
                .replace(/]/g, "")
                .replace(/\[/g, "")
            : "Unknown"
        }"`,
        item.title ?? "Unknown",
        item.language ?? "Unknown",
        "Unknown",
        "No",
        `"${
          item.subjects !== null && item.subjects == typeof "string"
            ? item.subjects
                .replace(/"/g, "")
                .replace(/]/g, "")
                .replace(/\[/g, "")
            : "Unknown"
        }"`,
        item.publisher ?? "Unknown",
        item.language ?? "Unknown",
        item.date_published ?? "Unknown",
        "Unknown",
        "Unknown",
        "Unknown",
        "No",
        "Any",
        "No",
        "No",
        "No",
        "No",
        "No",
        "No",
        "No",
        "No",
        "No",
        "No",
        "No",
        "No",
        "No",
        `${
          matches && matches[1] !== undefined
            ? `${parseFloat(matches[1])} Inches`
            : "Unknown"
        }`,
        `${
          matches && matches[2] !== undefined
            ? `${parseFloat(matches[2])} Inches`
            : "Unknown"
        }`,
        `${
          matches && matches[3] !== undefined
            ? `${parseFloat(matches[3])} Pounds`
            : "Unknown"
        }`,
        `${
          matches && matches[4] !== undefined
            ? `${parseFloat(matches[4])} Inches`
            : "Unknown"
        }`,
        `${item.pages ?? 0}`,
        "1",
        item.image ?? "Unknown",
        `"${"<font rwr='1' style='font-family: Arial' size='4'><title>Free eBay listing template designed by dewiso.com</title> ..."}"`,
        "Auction",
        "10",
        "5.0",
        "10",
        "1",
        "1",
        "paypal.adress@gmail.com",
        "0",
        "Thanks for your purchase.",
        "98122",
        "Flat",
        "UPSGround",
        "4.5",
        "5",
        "ReturnsAccepted",
        "Days_30",
        "MoneyBackOrExchange",
        "Seller",
      ]);
    }
  });

  const final = csvString.map((row) => row.join(",")).join("\n");

  return final;
};
