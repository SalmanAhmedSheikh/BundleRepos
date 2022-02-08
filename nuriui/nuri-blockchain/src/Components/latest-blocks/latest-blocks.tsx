import {
  Box,
  Link,
  TableBody,
  TableHead,
  Typography,
  TableFooter,
  TablePagination,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import configData from "../../config.json";
import { StyledTable, StyledTableRow, StyledTableCell } from "./styled-table";

interface IBlock {
  hash: string;
  time: BigInteger;
  height: BigInteger;
  blockIndex: BigInteger;
}

const LatestBlocks = () => {
  const history = useHistory();
  const [latestBlocks, setLatestBlocks] = useState<IBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    axios
      .get(`${configData.API_URL}/listBlocks`)
      .then((res) => {
        setLatestBlocks(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("erorr while retrieving data", error);
      });
  }, []);

  const showBlockDetails = (hash: string) => {
    history.push("/block/" + hash);
  };
  return (
    <React.Fragment>
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <>
          <Box mt={5} pl={3.0}>
            <Typography
              variant="h5"
              align="left"
              style={{ color: "#2196F3" }}
              component="div"
            >
              Latest Blocks
            </Typography>
          </Box>
          <Box px={1.5}>
            <StyledTable>
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell>
                    <Box pl={1.5} py={1}>
                      Block Hash
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box py={1}>Time</Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Box py={1}>Height</Box>
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {latestBlocks &&
                  latestBlocks
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((block, i) => {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell
                            onClick={() => showBlockDetails(block.hash)}
                          >
                            <Box pl={1.5} py={1}>
                              <Link
                                style={{ color: "#2196F3" }}
                                onClick={() => showBlockDetails(block.hash)}
                              >
                                {block.hash}
                              </Link>
                            </Box>
                          </StyledTableCell>
                          <StyledTableCell>{block.height}</StyledTableCell>

                          <StyledTableCell>{block.time}</StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
              </TableBody>
              <TableFooter>
                {latestBlocks && (
                  <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={latestBlocks.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                )}
              </TableFooter>
            </StyledTable>
          </Box>
        </>
      )}
    </React.Fragment>
  );
};

export default LatestBlocks;
