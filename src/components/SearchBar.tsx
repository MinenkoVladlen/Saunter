import { TextField } from "@mui/material";
import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search routes..."
      value={query}
      onChange={handleChange}
    />
  );
};

export default SearchBar;
