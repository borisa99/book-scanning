import type { Book } from "@prisma/client";

export const convertToCsv = (book: Book | null) => {
  if (book === null) return;

  const dimensions: {
    height: null | number;
    length: null | number;
    width: null | number;
    weight: null | number;
  } = {
    height: null,
    length: null,
    width: null,
    weight: null,
  };

  if (book && book.dimensions) {
    const regex =
      /Height: ([\d.]+) Inches, Length: ([\d.]+) Inches(?:, Weight: ([\d.]+) Pounds)?, Width: ([\d.]+) Inches/;
    const matches = book?.dimensions.match(regex);

    if (matches && matches.length >= 5) {
      dimensions.height = matches[1] ? parseFloat(matches[1]) : null;
      dimensions.length = matches[2] ? parseFloat(matches[2]) : null;
      dimensions.width = matches[4] ? parseFloat(matches[4]) : null;
      dimensions.weight = matches[3] ? parseFloat(matches[3]) : null;
    }
  }

  const csv = [
    {
      "Action(SiteID=UK|Country=GB|Currency=GBP|Version=1193|CC=UTF-8)": "Add",
      CustomLabel: "SKU",
      "*Category": "261186",
      "*Title": book?.title_long,
      "*ConditionID": "3000",
      "*C:Author": book?.authors ?? "",
      "*C:Book Title": book?.title,
      "*C:Language": book?.language,
      "*C:Topic": "Unknown",
      "C:Book Series": "No",
      "*C:Genre": book?.subjects ?? "",
      "*C:Publisher": book?.publisher,
      "*C:Format": book?.binding,
      "C:Original Language": book?.language,
      "*C:Publication Year": new Date(book?.date_published ?? "").getFullYear(),
      "*C:Narrative Type": "Unkown",
      "C:Character": "Unknown",
      "*C:Type": "Unknown",
      "C:Edition": "No",
      "C:Country/Region of Manufacture": "Any",
      "C:Features": "No",
      "*C:Intended Audience": "No",
      "C:Ex Libris": "No",
      "C:Personalise": "No",
      "C:Signed By": "No",
      "C:Inscribed": "No",
      "C:Personalised": "No",
      "C:Vintage": "No",
      "C:Signed": "No",
      "C:Literary Movement": "No",
      "C:Era": "No",
      "C:Illustrator": "No",
      "C:Time Period Manufactured": "No",
      "C:Item Height":
        dimensions.height != null ? `${dimensions.height} Inches` : "Unknown",
      "C:Item Length":
        dimensions.length != null ? `${dimensions.length} Inches` : "Unknown",
      "C:Item Weight":
        dimensions.weight != null ? dimensions.weight : "Unknown",
      "C:Item Width":
        dimensions.width != null ? `${dimensions.width} Inches` : "Unknown",
      "C:Number of Pages": book?.pages,
      "C:Unit Quantity": "1",
      PicURL: book?.image,
      "*Description":
        "<font rwr='1' style='font-family: Arial' size='4'><title>Free eBay listing template designed by dewiso.com</title><link href='https://dewiso.com/css/bootstrap.min.css' rel='stylesheet' /><style type='text/css'>.element{background-image:url('https://dewiso.com/images/f0f0f0_background.png');background-size:cover}</style><div style=' background: white; border-left: 1px solid white; border-right: 1px solid white; border-top: 1px solid white; color: black; line-height: 45px; ' > &nbsp;<div class='container' style='padding: 40px 0 40px 0'><div class='col-12 col-md-12'><hr style='background: black; height: 1px; width: 10%' align='center' /></div></div></div><div class='element' style=' border-left: 1px solid white; border-right: 1px solid white; color: black; line-height: 25px; ' ><div class='container' style='padding-bottom: 20px; padding-top: 50px'><div class='row'><div class='col-12 col-md-4' style='padding-bottom: 20px'> <font style='color: black' face='Arial' ><img alt='Product' class='mx-auto d-block img-fluid' src='https://img.icons8.com/material-sharp/96/000000/auction.png' style='width: 20%' title='Product' /></font><h2 style='text-align: center; line-height: 45px'> <strong><span style='font-size: 28px'>Buy</span></strong></h2><p> <span style='font-size: 16px' ><strong>Save up to 80% off Retail Price</strong> huge selection of once loved books at low prices</span ></p></div><div class='col-12 col-md-4' style='padding-bottom: 20px'> <span style='font-size: 16px' ><font style='color: black' face='Arial' ><img alt='Shipping' class='mx-auto d-block img-fluid' src='https://img.icons8.com/ios-filled/96/000000/winner.png' style='width: 20%' title='Shipping' /></font ></span><h2 style='text-align: center; line-height: 45px'> <strong ><span style='font-size: 28px' ><font style='color: black' face='Arial'>Reuse</font></span ></strong ></h2><p style='font-size: 14px; text-align: justify'> <span style='font-size: 16px' >Buy today and help save the planet and reduce your carbon footprint </span ></p></div><div class='col-12 col-md-4' style='padding-bottom: 20px'> <span style='font-size: 16px' ><font style='color: black' face='Arial' ><img alt='Contact' class='mx-auto d-block img-fluid' src='https://img.icons8.com/pastel-glyph/128/000000/truck.png' style='width: 20%' title='Contact' /></font ></span><h2 style='text-align: center; line-height: 45px'> <strong ><span style='font-size: 28px' ><font style='color: black' face='Arial'>Receive</font></span ></strong ></h2><div class='vc_row wpb_row vc_row-fluid'><div class='wpb_column vc_column_container vc_col-sm-12'><div class='vc_column-inner'><div class='wpb_wrapper'><div class='wpb_text_column wpb_content_element'><div class='wpb_wrapper'><p style='font-size: 14px; text-align: justify'> <span style='font-size: 16px' ><strong>UK wide home delivery available</strong>! Your parcel will be securely packaged with a tracking details provided, and insurance cover included. </span></p></div></div></div></div></div></div></div></div></div></div><div style=' border-left: 1px solid white; border-right: 1px solid white; color: black; line-height: 25px; ' ><div class='container' style='padding: 40px 0 40px 0'><div class='col-12 col-md-12'><div typeof='Product' vocab='https://schema.org/'><ul><li> <strong>Condition: </strong>This and any other item are sold as pre-owned, but in good, very good or like new condition (please read item condition part of this listing). This and any other item have been for heavy damage, if ISBN matches the ISBN description, all pages are intact, with none missing or heavily discoloured, all the pages free from writing, annotation, or answers (textbooks), free from any water damages and etc.</li></ul></div></div></div></div><div style=' background: white; border-left: 1px solid white; border-right: 1px solid white; color: black; line-height: 25px; ' ><div class='container' style='border-top: 1px solid white; padding: 40px 0 40px 0' ><div class='col-12 col-md-12'><h2 style='line-height: 45px'> <font style='color: black' face='Arial' >Features and further details</font ></h2><hr style='background: black; height: 1px; width: 10%' align='left' /><ul style=' color: black; line-height: 25px; font-size: 16px; margin-top: 30px; ' ><li> <font style='color: black' face='Arial' ><b>Cancelation and Returns:</b></font > As a consumer buyer you have the right to cancel/return this purchase without giving any reason at all within 30 days <b>but you are resposible to pay for postage</b>.</li><li> <font style='color: black' face='Arial'><b>Package: </b></font >Grey mailing sacks.</li><li> <strong>Postage</strong>: Item dispatched within 2 working days if paid before 6:00PM (excludes weekends and holidays). Immediate paymement required for this item. Delivered in 3-5day with a standart other delivery courier company (due to current situation).</li></ul></div></div></div><div style=' border-left: 1px solid white; border-right: 1px solid white; border-bottom: 1px solid white; color: black; line-height: 25px; ' ><div class='col-12 col-md-12 element' style='color: black'><div class='container' style='padding: 20px 0 20px 0; font-size: 80%; text-align: center' ><p>&nbsp;</p></div></div></div> </font>",
    },
  ];

  const csvString = [
    [
      "Action(SiteID=UK|Country=GB|Currency=GBP|Version=1193|CC=UTF-8)",
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
      "*C:Format",
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
    ],

    ...csv.map((item) => [
      item["Action(SiteID=UK|Country=GB|Currency=GBP|Version=1193|CC=UTF-8)"],
      item.CustomLabel,
      item["*Category"],
      item["*Title"],
      item["*ConditionID"],
      `"${item["*C:Author"]
        .toString()
        .replace(/"/g, "")
        .replace(/\[/g, "")
        .replace(/\]/g, "")}"`,
      item["*C:Book Title"],
      item["*C:Language"],
      item["*C:Topic"],
      item["C:Book Series"],
      `"${item["*C:Genre"]
        ?.toString()
        .replace(/"/g, "")
        .replace(/\[/g, "")
        .replace(/\]/g, "")}"`,
      item["*C:Publisher"],
      item["*C:Format"],
      item["C:Original Language"],
      item["*C:Publication Year"],
      item["*C:Narrative Type"],
      item["C:Character"],
      item["*C:Type"],
      item["C:Edition"],
      item["C:Country/Region of Manufacture"],
      item["C:Features"],
      item["*C:Intended Audience"],
      item["C:Ex Libris"],
      item["C:Personalise"],
      item["C:Signed By"],
      item["C:Inscribed"],
      item["C:Personalised"],
      item["C:Vintage"],
      item["C:Signed"],
      item["C:Literary Movement"],
      item["C:Era"],
      item["C:Illustrator"],
      item["C:Time Period Manufactured"],
      item["C:Item Height"],
      item["C:Item Length"],
      item["C:Item Weight"],
      item["C:Item Width"],
      item["C:Number of Pages"],
      item["C:Unit Quantity"],
      item.PicURL,
      `"${item["*Description"].toString().replace(/"/g, '""')}"`,
    ]),
  ]
    .map((e) => e.join(","))
    .join("\n");

  return csvString;
};
