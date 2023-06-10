import Head from "next/head";
import { type NextPage } from "next";
import { useRouter } from "next/router";
import Barcode from "react-barcode";
import { useEffect } from "react";

const BarcodePage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const handleAfterPrint = () => {
      void router.back();
    };

    function print() {
      window.print();
    }

    print(); // Call myFunction directly

    window.addEventListener("afterprint", handleAfterPrint);

    return () => {
      window.addEventListener("afterprint", handleAfterPrint);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Book Scanner</title>
      </Head>
      <main className="flex h-screen w-screen items-center justify-center">
        <Barcode value={router.query.barcode?.toString() ?? ""} />
      </main>
    </>
  );
};

export default BarcodePage;
