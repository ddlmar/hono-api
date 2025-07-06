function select<Type extends Record<string, unknown>, Keys extends keyof Type>(
  object: Type | Array<Type>,
  keysToReturn: Array<Keys>
): Array<Pick<Type, Keys>> {
  const propertiesToReturn = new Set<keyof Type>(keysToReturn);

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

function omit<Type extends Record<string, unknown>, Keys extends keyof Type>(
  object: Type | Array<Type>,
  keysToOmit: Array<Keys>
): Array<Omit<Type, Keys>> {
  const propertiesToOmit = new Set<keyof Type>(keysToOmit);

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
