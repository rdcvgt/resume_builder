import React from "react";
import PropTypes from "prop-types";
import Block from "../utils/Block";
import Item from "./Item";

Courses.propTypes = {
	dragHandleProps: PropTypes.object,
	blockId: PropTypes.string,
	handleDeleteButtonClick: PropTypes.func,
};

const blockInfo = {
	blockName: "Courses",
	blockDescription: null,
	addItemText: "course",
};

export default function Courses({
	dragHandleProps,
	blockId,
	handleDeleteButtonClick,
}) {
	return (
		<Block
			blockId={blockId}
			blockInfo={blockInfo}
			dragHandleProps={dragHandleProps}
			handleDeleteButtonClick={handleDeleteButtonClick}
			Item={Item}
		/>
	);
}
