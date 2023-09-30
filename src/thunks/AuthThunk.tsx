import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { composeReqUrl, getAppServerEndpoint } from "./ThunkUtil";

const APP_SERVER_ENDPOINT = getAppServerEndpoint();

export const verifyToken = async ({ accessToken, refreshToken }: any) => {
  const url = composeReqUrl(APP_SERVER_ENDPOINT, "/verify-token");
  const result = await axios.post(url, { accessToken, refreshToken });
  return result.data;
};
