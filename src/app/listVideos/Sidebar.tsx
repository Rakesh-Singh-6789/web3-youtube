import React from "react";
import { Stack } from "@mui/material";

import { categories } from "../../../utils/constants";

const Sidebar = () => (
  <Stack  className="mt-10"
    direction="row"
    sx={{
      overflowY: "auto",
      height: { sx: "auto", md: "95%" },
      flexDirection: { md: "column" },
    }}
  >
    {categories.map((category) => (
      <button
        className="category-btn"
        onClick={() => {}}
        style={{
          background: (category.name == 'All Videos' && "#FC1503" as any),
          color: "white",
        }}
        key={category.name}
      >
        <span style={{ color: category.name === 'All Videos' ? "white" : "red", marginRight: "15px" }}>
          {category.icon}
        </span>
        <span style={{ opacity: category.name === 'All Videos' ? "1" : "0.8" }}>
          {category.name}
        </span>
      </button>
    ))}
  </Stack>
);

export default Sidebar;