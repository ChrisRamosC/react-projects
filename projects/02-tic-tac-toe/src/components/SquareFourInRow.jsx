import PropTypes from 'prop-types';

export const SquareFourInRow = ({ children, isSelected, updateBoard, rowIndex, columnIndex }) => {
    const className = `square ${isSelected ? 'is-selected' : ''}`
    const handleClick = () => {
        updateBoard(columnIndex)
    }
    console.log(rowIndex, columnIndex)
 
    return (
        <div onClick={handleClick} className={className}>
            {children}
        </div>
    )
}

SquareFourInRow.propTypes = {
    children: PropTypes.node,
    isSelected: PropTypes.bool,
    updateBoard: PropTypes.func,
    rowIndex: PropTypes.number,
    columnIndex: PropTypes.number
}
