import axios from "axios";

export const getApiErrorMessage = (error: unknown, fallback = "Something went wrong") => {
  if (axios.isAxiosError(error)) {
    const responseMessage = error.response?.data?.error || error.response?.data?.message;
    if (typeof responseMessage === "string" && responseMessage.trim()) {
      return responseMessage;
    }

    if (error.code === "ERR_NETWORK") {
      return "The server is unavailable right now. Please try again shortly.";
    }
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return fallback;
};

const readResponse = <T extends { message?: string; error?: string }>(data: T) => {
  if (data.message === "Error") {
    throw new Error(data.error || "The server could not complete that request.");
  }
  return data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await axios.post("/user/login", { email, password });
  if (res.status !== 200) {
    throw new Error("Unable to login");
  }
  return readResponse(res.data);
};

export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await axios.post("/user/signup", { name, email, password });
  if (res.status !== 201) {
    throw new Error("Unable to Signup");
  }
  return readResponse(res.data);
};

export const checkAuthStatus = async () => {
  const res = await axios.get("/user/auth-status");
  if (res.status !== 200) {
    throw new Error("Unable to authenticate");
  }
  return readResponse(res.data);
};

export const sendChatRequest = async (
  message: string,
  history: { role: "user" | "assistant"; content: string }[] = []
) => {
  const res = await axios.post("/chat/new", { message, history });
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  return readResponse(res.data);
};

export const getUserChats = async () => {
  const res = await axios.get("/chat/all-chats");
  if (res.status !== 200) {
    throw new Error("Unable to send chat");
  }
  return readResponse(res.data);
};

export const deleteUserChats = async () => {
  const res = await axios.delete("/chat/delete");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  return readResponse(res.data);
};

export const logoutUser = async () => {
  const res = await axios.get("/user/logout");
  if (res.status !== 200) {
    throw new Error("Unable to delete chats");
  }
  return readResponse(res.data);
};