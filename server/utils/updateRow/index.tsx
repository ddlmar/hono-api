import moment from "moment";

function updatedAt<Type>(data: Type) {
  const updatedAt = moment().toISOString();

  return {
    ...data,
    updatedAt,
  };
}

export default { updatedAt };
