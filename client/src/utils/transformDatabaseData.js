export function addHrefFromID(urlBegining, dataFromId) {
  if (Array.isArray(dataFromId)) {
    const newData = dataFromId.map((item) => {
      return {
        ...item,
        href: `${urlBegining}/${item.id}`,
      };
    });
    return newData;
  } else if (typeof dataFromId === "object" && dataFromId !== null) {
    return {
      ...dataFromId,
      href: `${urlBegining}/${dataFromId.id}`,
    };
  }

  return null;
}
