import qs from 'qs';
const searchStringCache = {};

function getSearchString(str) {
  if (!str) {
    return '';
  }
  return str.substr(str.indexOf('?') > -1 ? str.indexOf('?') + 1 : 0);
}
function getUrlParams(name, str) {
  let search = str || window.location.search;
  if (!searchStringCache[search]) {
    search = getSearchString(search);
    searchStringCache[search] = qs.parse(search);
  }
  if (name) {
    return searchStringCache[search][name];
  }
  return searchStringCache[search];
}

function constructHash(address, hash) {
  let result = address;
  if (hash) {
    if (hash.charAt(0) !== '#' && result.charAt(result.length - 1) !== '#') {
      result += '#';
    }
    result += hash;
  }
  return result;
}

function hasProtocol(url) {
  if (/^((https?):)?\/\//.test(url)) {
    return true;
  } else {
    return false;
  }
}

function constructHost(host, protocol) {
  let result = '';
  let protocolStr = protocol;
  if (!protocolStr) {
    protocolStr = '//';
  }
  if (host) {
    if (hasProtocol(host)) {
      result += host;
    } else {
      result += protocolStr + host;
    }
  }
  return result;
}

function constructPath(hostString, path) {
  let result = hostString;
  if (path) {
    if (
      path.charAt(0) !== '/' &&
      result.charAt(result.length - 1) !== '/' &&
      result !== ''
    ) {
      result += '/';
    }
    result += path;
  }
  if (result.indexOf('?') > 0) {
    return result.split('?')[0];
  }
  return result;
}

function constructSearch(pathString, search) {
  let searchParams = search;
  let searchStringInPath = '';
  if (pathString.indexOf('?') > 0) {
    searchStringInPath = pathString.split('?')[1];
  }

  if (typeof searchParams === 'string') {
    searchParams = getSearchString(searchParams);
    searchParams = qs.parse(searchParams);
  }
  if (searchStringInPath) {
    Object.assign(searchParams, qs.parse(searchStringInPath));
  }
  let result = constructPath('', pathString);

  if (searchParams) {
    const searchString = qs.stringify(searchParams);
    if (searchString) {
      if (
        searchString.charAt(0) !== '?' &&
        result.charAt(result.length - 1) !== '?'
      ) {
        result += '?';
      }
      result += searchString;
    }
  }
  return result;
}

function constructUrl(host, path, search, hash, protocol) {
  let result = constructHost(host, protocol);
  result = constructPath(result, path);
  result = constructSearch(result, search);
  return constructHash(result, hash);
}

export { constructHash, getUrlParams, constructUrl };
