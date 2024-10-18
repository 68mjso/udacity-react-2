export function stringAvatar(name: string) {
  if (!name || name.trim() === "") {
    return {
      children: "",
    };
  }
  return {
    children: `${name.slice(0, 1)}`,
  };
}
