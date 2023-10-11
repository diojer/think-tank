import React from "react";
import { useState, useEffect } from "react";
//This page isn't really used, nothing links to /events, most just redirect directly to the LUU event
//engage page.

function Events() {
  useEffect(() => {
    window.open(
      "https://engage.luu.org.uk/groups/26GTR/leeds-think-tank-society/events",
      "_blank",
      "rel=noopener noreferrer"
    );
  }, []);
  return;
}

export default Events;
