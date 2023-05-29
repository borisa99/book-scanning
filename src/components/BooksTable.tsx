import type { Book } from "@prisma/client";
import dayjs from "dayjs";
import Image from "next/image";

const tableKeys = [
  { value: "image", title: "" },
  { value: "title", title: "Title" },
  { value: "title_long", title: "Title Long" },
  { value: "isbn", title: "ISBN" },
  { value: "isbn10", title: "ISBN10" },
  { value: "isbn13", title: "ISBN13" },
  { value: "authors", title: "Authors" },
  { value: "binding", title: "Binding" },
  { value: "edition", title: "Edition" },
  { value: "dimensions", title: "Dimensions" },
  { value: "publisher", title: "Publisher" },
  { value: "pages", title: "Pages" },
  { value: "language", title: "Language" },
  { value: "msrp", title: "MSRP" },
  { value: "subjects", title: "Subjects" },
  { value: "synopsis", title: "Synopsis" },
  { value: "date_published", title: "Date Published" },
  { value: "createdAt", title: "Created At" },
];

interface BooksTableProps {
  rows: Book[];
  page: number;
}
export default function BooksTable({ rows, page }: BooksTableProps) {
  const formatLongString = (value?: string | null) => {
    return value && value.length > 40 ? value.substring(0, 40) + "..." : value;
  };

  return (
    <div className="h-[calc(100vh-12.5rem)] overflow-x-auto">
      <table className="table-compact table w-full">
        <thead className="sticky">
          <tr>
            <th></th>
            {tableKeys.map((tKey) => (
              <th key={tKey.value}>{tKey.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <th>{index + 1}</th>
              <td>
                <div className="relative h-9 w-9">
                  {row.image && (
                    <Image
                      alt="book cover"
                      src={row.image}
                      className="object-cover object-center"
                      fill
                    />
                  )}
                </div>
              </td>
              <td>{formatLongString(row.title)}</td>
              <td>{formatLongString(row.title_long)}</td>
              <td>{row.isbn}</td>
              <td>{row.isbn10}</td>
              <td>{row.isbn13}</td>
              <td>{row.authors}</td>
              <td>{row.binding}</td>
              <td>{row.edition}</td>
              <td>{row.dimensions}</td>
              <td>{row.publisher}</td>
              <td>{row.pages}</td>
              <td>{row.language}</td>
              <td>{row.msrp}</td>
              <td>
                {row.subjects && formatLongString(row.subjects.toString())}
              </td>
              <td>{formatLongString(row.synopsis)}</td>
              <td>{row.date_published}</td>
              <td>{dayjs(row.createdAt).format("DD/MM/YYYY")}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
