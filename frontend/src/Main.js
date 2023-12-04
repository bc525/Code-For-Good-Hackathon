import React from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ViewPost } from "./components/ViewPost";
import { Hello } from "./components/Hello";

function Main() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Hello />}>
          {/* Home/Log in page */}
          <Route index element={<ViewPost />} />
          {/* Home page for admin */}
          <Route path="/admin/posts" />
          {/* Detail for each post */}
          <Route path="/admin/post/:id" />
          {/* Edit/Add post */}
          <Route path="/admin/update/:id" />
          {/* user info edit page*/}
          <Route path="/volunteer/edit/:id" />
          {/* volunteers info page */}
          <Route path="/volunteer/info/:id" />
        </Route>
      </Routes>
    </HashRouter>

  );
}

export default Main;
