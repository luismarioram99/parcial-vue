
const animatedScrollObserver = delay => new IntersectionObserver(
  (entries, animatedScrollObserver) => {
    entries.forEach((entry) => {
      console.log(delay);
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('enter');
          animatedScrollObserver.unobserve(entry.target);
        }, delay);
      }
    }); 
  }
)

export default {
  bind(el, binding) {
    el.classList.add('before-enter');
    var multiplier = el.dataset.mult;
    var delay = binding.expression;

    console.log(multiplier);

    if (!multiplier) multiplier = 1;
    if (!delay) delay = 0;
        
    const observer = animatedScrollObserver(binding.expression*multiplier);
    observer.observe(el);
  }
}