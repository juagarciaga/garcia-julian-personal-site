export const bgColor= '#f1f5f9'
export const folderPath = 'content/'

export const NavLinks = [
    { slug: "home", label: "🏠 home", href: "/" },
    { slug: "publications", label: "📚 publications", href: "/publications" },
    { slug: "teaching", label: "🎓 teaching", href: "/teaching" },
    { slug: "research", label: "🔬 research", href: "/research" },
    { slug: "other", label: "🎭 other", href: "/other" },
]

// Keep for backward compat with [slug] route
export const SlugLinks = ["teaching", "research", "other"]

export const scriptStatCounter = `
<!-- Default Statcounter code for Personal webpage http://garciajulian.com -->
<script type="text/javascript">
var sc_project=13020501;
var sc_invisible=1;
var sc_security="f76d1f72";
</script>
<script type="text/javascript"
src="https://www.statcounter.com/counter/counter.js" async></script>
<noscript><div class="statcounter"><a title="Web Analytics"
href="https://statcounter.com/" target="_blank"><img class="statcounter"
src="https://c.statcounter.com/13020501/0/f76d1f72/1/" alt="Web Analytics"
referrerPolicy="no-referrer-when-downgrade"></a></div></noscript>
<!-- End of Statcounter Code -->
`