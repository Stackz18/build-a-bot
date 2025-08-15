export default function (element, binding) {
  const e = element;
  e.style.position = 'absolute';

  Object.keys(binding.value).forEach((key) => {
    e.style[key] = binding.value[key];
  });
}
