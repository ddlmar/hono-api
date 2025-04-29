function select<Type extends Record<string, unknown>>(
  object: Type | Array<Type>,
  keysToReturn: Array<keyof Type>
) {
  const propertiesToReturn = new Set(keysToReturn);

  const pick = (obj: Type) => {
    const result: Partial<Type> = {};

    for (const key in obj) {
      if (propertiesToReturn.has(key)) {
        result[key] = obj[key];
      }
    }

    if (Object.keys(result).length < 1) {
      throw new Error("it is necessary to return at least one property");
    }

    return result as Type;
  };

  if (Array.isArray(object)) {
    return object.map(pick);
  }

  return [pick(object)];
}

function omit<Type extends Record<string, unknown>>(
  object: Type | Array<Type>,
  keysToOmit: Array<keyof Type>
) {
  const propertiesToOmit = new Set(keysToOmit);

  const omit = (obj: Type) => {
    const result: Partial<Type> = {};

    for (const key in obj) {
      if (!propertiesToOmit.has(key)) {
        result[key] = obj[key];
      }
    }

    if (Object.keys(result).length < 1) {
      throw new Error("it is necessary to return at least one property");
    }

    return result as Type;
  };

  if (Array.isArray(object)) {
    return object.map(omit);
  }

  return [omit(object)];
}

export default { select, omit };
