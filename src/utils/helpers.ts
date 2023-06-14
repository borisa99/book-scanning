import type { Book } from "@prisma/client";

export const convertToCsvString = (books: (Book | null)[]) => {
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
      "*Quantity",
      "*Location",
      "ShippingType",
      "ShippingService-1:Option",
      "ShippingService-1:Cost",
      "*DispatchTimeMax",
      "*ReturnsAcceptedOption",
      "ReturnsWithinOption",
      "RefundOption",
      "ShippingCostPaidByOption",
      "Product:ISBN",
    ],
  ];

  books.forEach((item) => {
    if (item) {
      const dimensions: {
        height: null | number;
        length: null | number;
        weight: null | number;
        width: null | number;
      } = {
        height: null,
        length: null,
        weight: null,
        width: null,
      };

      if (item.dimensions) {
        const regex =
          /Height: ([\d.]+) Inches, Length: ([\d.]+) Inches(?:, Weight: ([\d.]+) Pounds)?, Width: ([\d.]+) Inches/;

        const matches = item.dimensions.match(regex);

        if (matches && matches.length >= 5) {
          dimensions.height = matches[1] ? parseFloat(matches[1]) : null;
          dimensions.length = matches[2] ? parseFloat(matches[2]) : null;
          dimensions.width = matches[4] ? parseFloat(matches[4]) : null;
          dimensions.weight = matches[3] ? parseFloat(matches[3]) : null;
        }
      }

      csvString.push([
        "Add",
        item.sku ?? "",
        "261186",
        `"${
          item.title_long !== null
            ? item.title_long.replace(/"/g, '""')
            : "Unknown"
        }"`,
        "3000",
        `"${
          item.authors !== null
            ? item.authors
                .replace(/"/g, "")
                .replace(/]/g, "")
                .replace(/\[/g, "")
            : "Unknown"
        }"`,
        item.title !== null
          ? item.title.replace(/"/g, '""').replace(/,/g, '""')
          : "Unknown",
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
        item.publisher !== null
          ? item.publisher.replace(/"/g, '""').replace(/,/g, '""')
          : "Unknown",
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
          dimensions.height != null ? `${dimensions.height} Inches` : "Unknown"
        }`,
        `${
          dimensions.length != null ? `${dimensions.length} Inches` : "Unknown"
        }`,
        `${
          dimensions.weight != null ? `${dimensions.weight} Pounds` : "Unknown"
        }`,
        `${
          dimensions.width != null ? `${dimensions.width} Inches` : "Unknown"
        }`,
        `${item.pages ?? 0}`,
        "1",
        item.image ?? "Unknown",
        `"${"<font rwr='1' style='font-family: Arial' size='4'><title>Free eBay listing template designed by dewiso.com</title> ..."}"`,
        "FixedPrice",
        "GTC",
        JSON.stringify(item.msrp),
        "1",
        "TN6 1HR",
        "Flat",
        "UPSGround",
        "1",
        "4.5",
        "ReturnsAccepted",
        "Days_30",
        "MoneyBackOrExchange",
        "Seller",
        item.isbn13 ?? "Unknown",
      ]);
    }
  });

  const final = csvString.map((row) => row.join(",")).join("\n");

  return final;
};

export const formatLongString = (value?: string | null) => {
  return value && value.length > 40 ? value.substring(0, 40) + "..." : value;
};
