"""Generate importable Elementor page templates (NL + EN) and the theme zip.

Run from anywhere:  python wordpress/tools/build_templates.py

Output:
  wordpress/templates/<page>-<lang>.json   -> Elementor > Templates > Import
  wordpress/dist/ummah-builders-theme.zip  -> Appearance > Themes > Upload

Only free Elementor widgets are used (heading, text-editor, button, counter,
icon-box, spacer). Styling comes from the child theme via "CSS Classes".
"""

import json
import secrets
import zipfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "templates"
DIST = ROOT / "dist"
THEME_DIR = ROOT / "ummah-builders-theme"


# ---------------------------------------------------------------- builders

def _id():
    return secrets.token_hex(4)[:7]


def widget(kind, settings):
    return {"id": _id(), "elType": "widget", "settings": settings, "elements": [], "widgetType": kind}


def column(widgets, size=100, css=""):
    settings = {"_column_size": size, "_inline_size": None}
    if css:
        settings["css_classes"] = css
    return {"id": _id(), "elType": "column", "settings": settings, "elements": widgets, "isInner": False}


def section(columns, css="", full_width=False, gap="wide"):
    settings = {"gap": gap, "css_classes": css}
    if full_width:
        settings["layout"] = "full_width"
    else:
        settings["content_width"] = {"unit": "px", "size": 1140, "sizes": []}
    return {"id": _id(), "elType": "section", "settings": settings, "elements": columns, "isInner": False}


def heading(text, tag="h2", css="", align=""):
    s = {"title": text, "header_size": tag}
    if css:
        s["_css_classes"] = css
    if align:
        s["align"] = align
    return widget("heading", s)


def text(html, css="", align=""):
    s = {"editor": html}
    if css:
        s["_css_classes"] = css
    if align:
        s["align"] = align
    return widget("text-editor", s)


def button(label, url, style="ub-btn-primary", align=""):
    s = {"text": label, "link": {"url": url, "is_external": "", "nofollow": ""}, "_css_classes": style}
    if align:
        s["align"] = align
    return widget("button", s)


def counter(number, title, suffix=""):
    return widget("counter", {
        "starting_number": 0,
        "ending_number": number,
        "suffix": suffix,
        "title": title,
        "_css_classes": "ub-stat",
    })


def card(icon, title, desc):
    return widget("icon-box", {
        "selected_icon": {"value": icon, "library": "fa-solid"},
        "title_text": title,
        "description_text": desc,
        "position": "top",
        "title_size": "h3",
        "_css_classes": "ub-card",
    })


def spacer(px):
    return widget("spacer", {"space": {"unit": "px", "size": px, "sizes": []}})


def template(title, content):
    return {
        "version": "0.4",
        "title": title,
        "type": "page",
        "content": content,
        "page_settings": {"template": "elementor_header_footer", "hide_title": "yes"},
    }


def intro(eyebrow, title, body=None, align="center"):
    """Eyebrow + section title (+ optional paragraph) as a widget list."""
    items = [heading(eyebrow, "p", "ub-eyebrow", align), heading(title, "h2", "ub-title", align)]
    if body:
        items.append(text(f"<p>{body}</p>", align=align))
    items.append(spacer(30))
    return items


# ---------------------------------------------------------------- content

COPY = {
    "nl": {
        "home_title": "Home",
        "badge": "Fase 1 — we leggen de basis",
        "hero": "Samen bouwen aan een <em>sterke</em> ummah.",
        "hero_text": "Een eerlijk professioneel netwerk voor de ummah. Een plek om te leren, te bouwen en elkaar vooruit te helpen — binnen duidelijke islamitische grenzen, met focus op kwaliteit, kennis en echte impact.",
        "join": "Word lid",
        "manifesto": "Lees ons manifest",
        "stats": [(5, "fasen in onze roadmap"), (12, "thema's om in bij te dragen"), (1, "gedeelde visie")],
        "why_eyebrow": "Waarom Ummah Builders",
        "why_title": "Het talent is er. Het is alleen <em>verspreid</em>.",
        "why_text": "Binnen de ummah zitten ingenieurs, ondernemers, designers, onderzoekers en professionals met jaren ervaring. Wat ontbreekt is een plek waar dat talent elkaar vindt, kennis deelt en samen bouwt — en waar jongeren zien wat mogelijk is.",
        "pillars": [
            ("fas fa-book-open", "Leren", "Een gedeelde kennisbank, lezingen, masterclasses en micro-cursussen over financiën, technologie, ondernemerschap en ethiek."),
            ("fas fa-tools", "Bouwen", "Hackathons, sharktank-sessies en projectgroepen waar ideeën uitgroeien tot echte projecten, met feedback van mentoren."),
            ("fas fa-hands-helping", "Elkaar vooruithelpen", "Hulp bij werk, stages en professionele groei. Ervaren leden helpen starters op weg."),
        ],
        "ladder_eyebrow": "Een ladder voor elke fase",
        "ladder_title": "Van eerste stap tot eigen project.",
        "ladder": [
            ("01", "Buddy", "Elk nieuw lid krijgt een buddy, naar het voorbeeld van de Muhajirien en de Ansar, die helpt de weg te vinden in de community."),
            ("02", "Mentor", "Starters en jongeren worden gekoppeld aan ervaren professionals voor begeleiding in carrière en ondernemerschap."),
            ("03", "Sharktank", "Pitch je idee voor mentoren en ervaren ondernemers en krijg eerlijke feedback op je plan."),
            ("04", "Bouwen", "Sterke projecten krijgen begeleiding, een team uit het netwerk en later toegang tot halal financiering."),
        ],
        "meaning_eyebrow": "Een voorbeeld voor de jeugd",
        "meaning": "“We willen positieve rolmodellen zijn, zodat jongeren niet afhankelijk zijn van verkeerde voorbeelden.”",
        "meaning_text": "Leden delen hun carrièreladder: hoe ze begonnen, waar ze vastliepen en wat het netwerk voor hen betekende. Zo zien jongeren dat er een weg is.",
        "principles_eyebrow": "Onze grenzen",
        "principles_title": "Wat we bewust <em>níet</em> doen.",
        "principles": [
            ("fas fa-ban", "Geen verslavend algoritme", "Geen eindeloze feeds of kunstmatige prikkels. Je komt voor inhoud en mensen, niet om te blijven scrollen."),
            ("fas fa-comment-slash", "Geen DM-cultuur", "Gestructureerde gesprekken in themakanalen en projectgroepen in plaats van chaotische privéchats."),
            ("fas fa-user-shield", "Geen misbruik van data", "Je gegevens worden niet verkocht of misbruikt. Wat er met geld gebeurt, rapporteren we transparant."),
        ],
        "steps_eyebrow": "Lid worden",
        "steps_title": "In drie stappen erbij.",
        "steps": [
            ("1", "Maak je profiel", "Vertel wie je bent, wat je doet en in welke thema's je wil leren of bijdragen."),
            ("2", "Leer de community kennen", "Je buddy helpt je op weg en stelt je voor aan mensen die bij jouw doelen passen."),
            ("3", "Bouw mee", "Neem deel aan lezingen, hackathons en projectgroepen — of start er zelf een."),
        ],
        "roadmap_eyebrow": "Waar we staan",
        "roadmap_title": "We bouwen stap voor stap.",
        "roadmap_text": "We zitten in fase 1: het manifest, duidelijke regels en het kernteam. Daarna volgen de eerste website, kennisbank en evenementen, een communityplatform, een transparant halal betaalsysteem en slimme matching.",
        "roadmap_btn": "Bekijk de roadmap",
        "cta_title": "De ummah bouwt.<br><em>Bouw je mee?</em>",
        "cta_text": "Maak je profiel aan en word deel van een netwerk dat leert, bouwt en elkaar vooruithelpt.",
        "cta_btn": "Maak je profiel aan",
        "manifesto_page": "Manifest",
        "roadmap_page": "Roadmap",
        "roadmap_url": "/roadmap/",
        "manifesto_url": "/manifest/",
    },
    "en": {
        "home_title": "Home (EN)",
        "badge": "Phase 1 — laying the foundation",
        "hero": "Building a <em>strong</em> ummah, together.",
        "hero_text": "An honest professional network for the ummah. A place to learn, to build and to help each other grow — within clear Islamic boundaries, focused on quality, knowledge and real impact.",
        "join": "Join",
        "manifesto": "Read our manifesto",
        "stats": [(5, "phases in our roadmap"), (12, "themes to contribute to"), (1, "shared vision")],
        "why_eyebrow": "Why Ummah Builders",
        "why_title": "The talent is there. It is just <em>scattered</em>.",
        "why_text": "The ummah is full of engineers, entrepreneurs, designers, researchers and seasoned professionals. What is missing is a place where that talent finds each other, shares knowledge and builds together — and where young people see what is possible.",
        "pillars": [
            ("fas fa-book-open", "Learn", "A shared knowledge base, talks, masterclasses and micro-courses on finance, technology, entrepreneurship and ethics."),
            ("fas fa-tools", "Build", "Hackathons, shark-tank sessions and project groups where ideas grow into real projects, with feedback from mentors."),
            ("fas fa-hands-helping", "Help each other grow", "Support with jobs, internships and professional growth. Experienced members help newcomers find their way."),
        ],
        "ladder_eyebrow": "A ladder for every stage",
        "ladder_title": "From first step to your own project.",
        "ladder": [
            ("01", "Buddy", "Every new member gets a buddy, following the example of the Muhajirun and the Ansar, to help them find their way in the community."),
            ("02", "Mentor", "Starters and young people are paired with experienced professionals for guidance in their career and business."),
            ("03", "Shark tank", "Pitch your idea to mentors and experienced entrepreneurs and get honest feedback on your plan."),
            ("04", "Build", "Strong projects get guidance, a team from the network and, later on, access to halal funding."),
        ],
        "meaning_eyebrow": "An example for the youth",
        "meaning": "“We want to be positive role models, so young people do not depend on the wrong examples.”",
        "meaning_text": "Members share their career ladder: how they started, where they got stuck and what the network meant to them. That way young people see there is a path.",
        "principles_eyebrow": "Our boundaries",
        "principles_title": "What we deliberately do <em>not</em> do.",
        "principles": [
            ("fas fa-ban", "No addictive algorithm", "No endless feeds or artificial triggers. You come for substance and people, not to keep scrolling."),
            ("fas fa-comment-slash", "No DM culture", "Structured conversations in theme channels and project groups instead of chaotic private chats."),
            ("fas fa-user-shield", "No misuse of data", "Your data is not sold or misused. We report transparently on what happens with money."),
        ],
        "steps_eyebrow": "Becoming a member",
        "steps_title": "Join in three steps.",
        "steps": [
            ("1", "Create your profile", "Tell us who you are, what you do and which themes you want to learn about or contribute to."),
            ("2", "Get to know the community", "Your buddy helps you get started and introduces you to people who match your goals."),
            ("3", "Build with us", "Join talks, hackathons and project groups — or start one yourself."),
        ],
        "roadmap_eyebrow": "Where we are",
        "roadmap_title": "We are building step by step.",
        "roadmap_text": "We are in phase 1: the manifesto, clear rules and the core team. Next come the first website, knowledge base and events, a community platform, a transparent halal payment system and smart matching.",
        "roadmap_btn": "View the roadmap",
        "cta_title": "The ummah is building.<br><em>Will you build with us?</em>",
        "cta_text": "Create your profile and become part of a network that learns, builds and helps each other grow.",
        "cta_btn": "Create your profile",
        "manifesto_page": "Manifesto",
        "roadmap_page": "Roadmap",
        "roadmap_url": "/en/roadmap/",
        "manifesto_url": "/en/manifesto/",
    },
}

MANIFESTO = {
    "nl": {
        "eyebrow": "Eerste versie — samen verder uit te werken",
        "title": "Het Ummah Builders <em>manifest</em>",
        "intro": "We willen een sterk en eerlijk professioneel netwerk bouwen voor de ummah: een plek waar mensen samenkomen om te leren, te bouwen en elkaar vooruit te helpen.",
        "sections": [
            ("I. Binnen islamitische grenzen", "Alles wat we doen gebeurt binnen duidelijke islamitische grenzen: in hoe we omgaan met elkaar, met geld en met data."),
            ("II. Kwaliteit en kennis", "We kiezen voor inhoud boven lawaai. Gestructureerde gesprekken, een gedeelde kennisbank en mentoring door ervaren professionals."),
            ("III. Echte impact", "Talent binnen de ummah is groot maar verspreid. Via projectgroepen, hackathons en sharktank-sessies zetten we ideeën om in werkende projecten."),
            ("IV. Een voorbeeld voor de jeugd", "We willen positieve rolmodellen zijn, zodat jongeren niet afhankelijk zijn van verkeerde voorbeelden. Leden delen hun carrièreladder zodat anderen zien wat mogelijk is."),
            ("V. Wat we niet doen", "Geen verslavend algoritme, geen DM-cultuur en geen misbruik van data. Geld dat door de community gaat, wordt transparant gerapporteerd."),
        ],
    },
    "en": {
        "eyebrow": "First draft — to be developed together",
        "title": "The Ummah Builders <em>manifesto</em>",
        "intro": "We want to build a strong and honest professional network for the ummah: a place where people come together to learn, to build and to help each other grow.",
        "sections": [
            ("I. Within Islamic boundaries", "Everything we do happens within clear Islamic boundaries: in how we treat each other, money and data."),
            ("II. Quality and knowledge", "We choose substance over noise. Structured conversations, a shared knowledge base and mentoring by experienced professionals."),
            ("III. Real impact", "The talent within the ummah is vast but scattered. Through project groups, hackathons and shark-tank sessions we turn ideas into working projects."),
            ("IV. An example for the youth", "We want to be positive role models, so young people do not depend on the wrong examples. Members share their career ladder so others see what is possible."),
            ("V. What we do not do", "No addictive algorithm, no DM culture and no misuse of data. Money that flows through the community is reported transparently."),
        ],
    },
}

ROADMAP = {
    "nl": {
        "eyebrow": "Roadmap",
        "title": "Hoe we het ecosysteem <em>stap voor stap</em> bouwen.",
        "current": "Nu bezig",
        "phases": [
            ("0–3 maanden", "Richting en basis leggen", ["Manifest: waar staan we voor, wat doen we wel en niet", "Duidelijke regels rond gedrag, financiën en data", "Kernteam en manier van beslissen vastleggen", "Talent en expertise binnen de groep in kaart brengen", "Leren van bestaande moslim-initiatieven in andere landen"]),
            ("3–8 maanden", "Eerste community en testen", ["Website (eerste versie) en kennisbank", "Eerste lezingen en een kleine, praktische hackathon", "Samenwerking met studentenverenigingen", "Podcast en korte video's over carrièreontwikkeling", "Sharktank-sessies voor nieuwe ideeën"]),
            ("8–15 maanden", "Communityplatform", ["Themakanalen, forum en projectgroepen", "Halal freelance- en projectmatching binnen de ummah", "Portfolio's, mentoring en een buddy-systeem", "Hulp bij werk, stages en professionele ontwikkeling", "Kleinschalige evenementen en lokale sponsors"]),
            ("15–20 maanden", "Financieel systeem", ["Transparant halal betaalsysteem", "Crowdfunding voor projecten", "Duidelijke rapportering over geldstromen"]),
            ("20–30 maanden", "AI en automatisatie", ["AI-zoekfunctie in de kennisbank", "Slimme matching met projecten, stages en mentors", "Geen misbruik van data"]),
        ],
    },
    "en": {
        "eyebrow": "Roadmap",
        "title": "How we build the ecosystem, <em>step by step</em>.",
        "current": "In progress",
        "phases": [
            ("0–3 months", "Direction and foundation", ["Manifesto: what we stand for, what we do and do not do", "Clear rules on conduct, finances and data", "Set up the core team and how decisions are made", "Map the talent and expertise within the group", "Learn from existing Muslim initiatives in other countries"]),
            ("3–8 months", "First community and testing", ["Website (first version) and knowledge base", "First talks and a small, practical hackathon", "Partnerships with student associations", "Podcast and short videos on career development", "Shark-tank sessions for new ideas"]),
            ("8–15 months", "Community platform", ["Theme channels, forum and project groups", "Halal freelance and project matching within the ummah", "Portfolios, mentoring and a buddy system", "Help with jobs, internships and professional development", "Small-scale events and local sponsors"]),
            ("15–20 months", "Financial system", ["Transparent halal payment system", "Crowdfunding for projects", "Clear reporting on money flows"]),
            ("20–30 months", "AI and automation", ["AI search in the knowledge base", "Smart matching with projects, internships and mentors", "No misuse of data"]),
        ],
    },
}


# ---------------------------------------------------------------- pages

def home(c):
    return template(c["home_title"], [
        section([column([
            heading(c["badge"], "p", "ub-badge", "center"),
            spacer(24),
            heading(c["hero"], "h1", "ub-hero-title", "center"),
            spacer(18),
            text(f"<p>{c['hero_text']}</p>", align="center"),
            spacer(26),
            button(c["join"], "#ub-join", "ub-btn-primary"),
            button(c["manifesto"], c["manifesto_url"], "ub-btn-ghost"),
        ])], css="ub-hero"),

        section([column([counter(n, label)], size=33.333) for n, label in c["stats"]],
                css="ub-section--tight ub-bg-paper"),

        section([column(intro(c["why_eyebrow"], c["why_title"], c["why_text"]))], css="ub-section ub-bg-cream"),

        section([column([card(*p)], size=33.333) for p in c["pillars"]], css="ub-section--tight ub-bg-cream"),

        section([column(intro(c["ladder_eyebrow"], c["ladder_title"]))], css="ub-section ub-bg-paper"),
        section([column([
            heading(num, "p", "ub-step-number"),
            heading(title, "h3", "ub-step-title"),
            text(f"<p>{desc}</p>"),
        ], size=25) for num, title, desc in c["ladder"]], css="ub-section--tight ub-bg-paper ub-ladder"),

        section([column([
            heading(c["meaning_eyebrow"], "p", "ub-eyebrow", "center"),
            spacer(10),
            heading(c["meaning"], "p", "ub-meaning", "center"),
            spacer(14),
            text(f"<p>{c['meaning_text']}</p>", align="center"),
        ])], css="ub-section ub-bg-cream"),

        section([column(intro(c["principles_eyebrow"], c["principles_title"]))], css="ub-section ub-bg-night"),
        section([column([card(*p)], size=33.333) for p in c["principles"]], css="ub-section--tight ub-bg-night"),

        section([column(intro(c["steps_eyebrow"], c["steps_title"]))], css="ub-section ub-bg-paper"),
        section([column([
            heading(num, "p", "ub-step-number"),
            heading(title, "h3", "ub-step-title"),
            text(f"<p>{desc}</p>"),
        ], size=33.333) for num, title, desc in c["steps"]], css="ub-section--tight ub-bg-paper"),

        section([column([
            *intro(c["roadmap_eyebrow"], c["roadmap_title"], c["roadmap_text"]),
            button(c["roadmap_btn"], c["roadmap_url"], "ub-btn-ghost", "center"),
        ])], css="ub-section ub-bg-cream"),

        section([column([
            heading(c["cta_title"], "h2", "ub-title", "center"),
            spacer(14),
            text(f"<p>{c['cta_text']}</p>", align="center"),
            spacer(20),
            button(c["cta_btn"], "#ub-join", "ub-btn-light", "center"),
        ])], css="ub-cta"),
    ])


def manifesto(lang):
    m, c = MANIFESTO[lang], COPY[lang]
    body = [
        heading(m["eyebrow"], "p", "ub-eyebrow", "center"),
        heading(m["title"], "h1", "ub-title", "center"),
        spacer(20),
        text(f"<p>{m['intro']}</p>", align="center"),
        spacer(40),
    ]
    for title, para in m["sections"]:
        body += [heading(title, "h2", "ub-step-title"), text(f"<p>{para}</p>"), spacer(20)]
    body += [spacer(20), button(c["join"], "#ub-join", "ub-btn-primary", "center")]
    return template(c["manifesto_page"], [
        section([column(body)], css="ub-section ub-bg-cream", gap="default"),
    ])


def roadmap(lang):
    r, c = ROADMAP[lang], COPY[lang]
    content = [section([column(intro(r["eyebrow"], r["title"]))], css="ub-section ub-bg-cream")]
    for i, (period, title, items) in enumerate(r["phases"]):
        label = f"{period} · {r['current']}" if i == 0 else period
        bullets = "".join(f"<li>{item}</li>" for item in items)
        content.append(section([
            column([heading(f"0{i + 1}", "p", "ub-step-number")], size=16),
            column([
                heading(label, "p", "ub-eyebrow"),
                heading(title, "h2", "ub-step-title"),
                text(f"<ul>{bullets}</ul>"),
            ], size=84),
        ], css="ub-section--tight " + ("ub-bg-paper" if i % 2 == 0 else "ub-bg-cream")))
    content.append(section([column([
        heading(c["cta_title"], "h2", "ub-title", "center"),
        spacer(20),
        button(c["cta_btn"], "#ub-join", "ub-btn-light", "center"),
    ])], css="ub-cta"))
    return template(c["roadmap_page"], content)


# ---------------------------------------------------------------- main

def main():
    OUT.mkdir(exist_ok=True)
    DIST.mkdir(exist_ok=True)
    pages = {"home": lambda l: home(COPY[l]), "manifest": manifesto, "roadmap": roadmap}
    for lang in ("nl", "en"):
        for name, build in pages.items():
            path = OUT / f"{name}-{lang}.json"
            path.write_text(json.dumps(build(lang), ensure_ascii=False, indent=1), encoding="utf-8")
            print("wrote", path.relative_to(ROOT))

    zip_path = DIST / "ummah-builders-theme.zip"
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for file in sorted(THEME_DIR.rglob("*")):
            if file.is_file():
                zf.write(file, Path("ummah-builders-theme") / file.relative_to(THEME_DIR))
    print("wrote", zip_path.relative_to(ROOT))


if __name__ == "__main__":
    main()
