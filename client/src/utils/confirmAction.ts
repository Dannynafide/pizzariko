export function confirmAction(text: string): boolean {
  var r = confirm(text);

  if (r === true) return true;
  return false;
}
