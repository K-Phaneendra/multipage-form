import PropTypes from "prop-types";
import Pagination from "react-bootstrap/Pagination";

export default function PaginationCustom({ pageCount, size, activePage }) {
  let items = [];
  for (let number = 1; number <= pageCount; number++) {
    items.push(
      <Pagination.Item key={number} active={number === activePage}>
        {/* {number} */}
      </Pagination.Item>
    );
  }

  return <Pagination size={size}>{items}</Pagination>;
}

PaginationCustom.propTypes = {
  size: PropTypes.string,
  pageCount: PropTypes.number.isRequired,
  activePage: PropTypes.number,
};

PaginationCustom.defaultProps = {
  size: "", // lg, sm
  pageCount: 5,
  activePage: 1,
};
