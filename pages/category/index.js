import Head from "next/head";
import { useState, useEffect } from "react";
import * as Realm from "realm-web";
import Category from "../../components/Category";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Pagination from "../../components/Pagination";
import Products from "../../components/Products";

export default function Home() {

    const [categories, setCategories] = useState([]);

    useEffect(async () => {

        // add your Realm App Id to the .env.local file
        const REALM_APP_ID = process.env.NEXT_PUBLIC_REALM_APP_ID;
        const app = new Realm.App({ id: REALM_APP_ID });
        const credentials = Realm.Credentials.anonymous();
        try {
            const user = await app.logIn(credentials);

            const allCategories = await user.functions.getAllCategories();
            setCategories(() => allCategories.sort())

        } catch (error) {
            console.error(error);
        }

    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-white w-full min-h-screen">
                <Header />
                <Container>
                    {categories.map(instance => {
                        return (
                            <>
                                <Category
                                    category={instance}
                                />

                            </>
                        )
                    })}

                    <Pagination />
                </Container>
                <Footer />
            </div>
        </div>
    );
}
