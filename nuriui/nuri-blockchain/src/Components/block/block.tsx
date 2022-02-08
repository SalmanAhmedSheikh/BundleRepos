import { Box, Link, TableBody, TableCell, Typography } from "@material-ui/core";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import configData from "../../config.json";
import { StyledTable, StyledTableCell, StyledTableRow } from "./styled-table";

interface IBlock {
  size: BigInteger;
  block_index: BigInteger;
  prev_block: string;
  hash: string;
}

interface IRouteParams {
  blockId: string;
}

const Block = () => {
  const history = useHistory();
  const { blockId } = useParams<IRouteParams>();
  const [blockDetail, setBlockDetail] = useState<IBlock>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${configData.API_URL}/blockDetails/${blockId}`)

      .then((res) => {
        setBlockDetail(res.data);
        console.log("res", res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("erorr while retrieving block detail", error);
      });
  }, [blockId]);

  const showBlockDetails = (hash: string) => {
    setLoading(true);
    history.push("/block/" + hash);
  };

  return (
    <React.Fragment>
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <Box>
          <Box mt={5} pl={3}>
            <Typography
              variant="h5"
              align="left"
              style={{ color: "#2196F3" }}
              component="div"
            >
              Block details
            </Typography>
          </Box>
          <Box px={1.5}>
            <StyledTable>
              <TableBody>
                <StyledTableRow>
                  <StyledTableCell>Size</StyledTableCell>
                  <StyledTableCell>
                    {blockDetail && blockDetail.size}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Block Index</StyledTableCell>
                  <StyledTableCell>
                    {blockDetail && blockDetail.block_index}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <TableCell>Previous Hash</TableCell>

                  <StyledTableCell>
                    {blockDetail && (
                      <Link
                        style={{ color: "#2196F3" }}
                        onClick={() => showBlockDetails(blockDetail.prev_block)}
                      >
                        {blockDetail && blockDetail.prev_block}
                      </Link>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
                <StyledTableRow>
                  <StyledTableCell>Block hash</StyledTableCell>
                  <StyledTableCell>
                    {blockDetail && blockDetail.hash}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </StyledTable>
          </Box>
        </Box>
      )}
    </React.Fragment>
  );
};

export default Block;
