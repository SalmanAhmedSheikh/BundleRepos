import { Table, TableRow, TableCell } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import styled from "styled-components";

export const StyledTable = styled(Table)`
  thead {
    tr {
      th {
        font-size: 14px;
        font-weight: 600;
        padding: 10px 0px;
        &:first-child {
          width: 50%;
        }
        &:nth-child(2) {
          width: 30%;
        }
        &:nth-child(3) {
          width: 30%;
        }
      }
    }
  }
  tr {
    td {
      font-size: 14px;
      padding: 3px 0px;
    }
  }
  tbody {
    tr {
      :hover {
        background-color: "silver";
        cursor: pointer;
      }
    }
  }
`;
export const StyledTableCell = withStyles(() => ({
  head: {
    backgroundColor: "#2196F3",
    color: "white",
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);
export const StyledTableRow = withStyles(() => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#F5F5F5",
    },
  },
}))(TableRow);
