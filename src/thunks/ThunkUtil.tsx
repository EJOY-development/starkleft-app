import PackageJson from "../../package.json";

export const composeReqUrl = (endpoint: string, path: string) => {
  if (typeof endpoint !== "string") {
    throw Error(`Given endpoint should be string, given: ` + JSON.stringify(endpoint));
  }
  if (endpoint.length === 0) {
    throw Error(`Given endpoint should be specified, empty string given.`);
  }
  if (path == null || path.length === 0) {
    return endpoint;
  }

  const endpointEndsWithSlash = endpoint.charAt(endpoint.length - 1) === "/";
  const pathStartsWithSlash = path.charAt(0) === "/";

  if (endpointEndsWithSlash && pathStartsWithSlash) {
    // two slashes conflicts
    endpoint = endpoint.slice(0, -1);
  } else if (!endpointEndsWithSlash && !pathStartsWithSlash) {
    // no slashes between endpoint & path
    endpoint = endpoint + "/";
  }

  return endpoint + path;
};

export const getAppServerEndpoint = () => {
  return "http://192.168.219.173:3930/";
};
