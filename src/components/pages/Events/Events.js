import React from "react";
import { useState, useEffect } from "react";

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
