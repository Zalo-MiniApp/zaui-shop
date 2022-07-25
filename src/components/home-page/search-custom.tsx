import React, { useRef, useState } from "react";
import Input from "zmp-framework/react/input";
import List from "zmp-framework/react/list";
import ListInput from "zmp-framework/react/list-input";
import Icon from "zmp-framework/react/icon";
import { createPortal } from "react-dom";
import { zmp } from "zmp-framework/react/lite";

const SearchCustom = ({
  onHandleSubmitForm,
}: {
  onHandleSubmitForm: (e) => void;
}) => {
  const [isTyping, setIsTyping] = useState<boolean>(false);
  return (
    <List
      style={{ listStyle: "none" }}
      form
      id="search-form"
      onSubmit={(e) => {
        e.preventDefault();
        e.target[0].blur();
        setIsTyping(false);
        onHandleSubmitForm(zmp.form.convertToData("#search-form"));
      }}
      noHairlinesBetween
      className="custom-search flex items-center justify-between flex-row m-0"
    >
      {createPortal(
        <div
          className="absolute left-0 bg-zinc-900/70 w-full h-screen top-[calc(2rem+0.75rem*2)]"
          onClick={() => setIsTyping(false)}
          style={{ zIndex: isTyping ? "9999999" : "-9999" }}
        />,
        document.getElementById("zmp-root")!
      )}
      <div className="w-full">
        <ListInput
          id="input-search"
          wrap={false}
          type="text"
          placeholder="Tìm kiếm"
          clearButton
          name="search"
          inputStyle={{
            borderRadius: "0.75rem",
            backgroundColor: "white",
            width: "100%",
            height: "2rem",
            minHeight: "0",
          }}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
        />
      </div>
      <button
        className="ml-1.5 w-8 h-8 bg-white rounded-xl flex items-center justify-center"
        type="submit"
      >
        <Icon zmp="zi-search" size={18} className=" text-primary" />
      </button>
    </List>
  );
};

export default SearchCustom;
