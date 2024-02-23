import { React } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.scss";
import DashboardPage from "./features/dashboard/components/DashboardPage";
import BecomeAProPage from "./features/Pro/components/BecomeAProPage";
import Footer from "./features/footer/components/Footer";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import Header from "./features/header/components/Header";
library.add(faSearch, faUserCircle);

const App = () => (
    <div className="layout">
        <Header />
        <main>
            <Routes>
                <Route exact path="/" element={<DashboardPage />} />
                <Route exact path="/pro" element={<BecomeAProPage />} />
            </Routes>
        </main>
        <Footer />
    </div>
);

export default App;
