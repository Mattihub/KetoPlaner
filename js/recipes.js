// ============================================================
//  VegeProtein – Rezept-Bibliothek
//  60 Rezepte: 20 Frühstück · 20 Mittagessen · 20 Abendessen
//  Wird global als window.RECIPES bereitgestellt.
// ============================================================
window.RECIPES = [

  // ══════════════════════════════════════════════════════════
  //  FRÜHSTÜCK (bf_p1 – bf_p20)
  //  Regel: ≤ 10 Min Zubereitung ODER abends vorbereitbar
  // ══════════════════════════════════════════════════════════
  {id:"bf_p1", name:"Beeren-Protein-Quark", type:"breakfast", prepMin:5,
    macros:{kcal:340,carbs:18,protein:35,fat:8},
    ingredients:["250g Magerquark","50g TK-Beeren (aufgetaut)","20g Mandeln gehackt","Schuss Mineralwasser"],
    steps:"Quark mit einem Schuss Mineralwasser cremig rühren. Beeren und gehackte Mandeln unterheben. Fertig.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"bf_p2", name:"Herzhafter Hüttenkäse-Topf", type:"breakfast", prepMin:5,
    macros:{kcal:310,carbs:8,protein:30,fat:12},
    ingredients:["200g Hüttenkäse","½ Gurke gewürfelt","2 EL Kürbiskerne","1 EL Leinsamen"],
    steps:"Gurke würfeln und mit Hüttenkäse und den Kernen mischen. Mit Pfeffer abschmecken.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"bf_p3", name:"Leinsamen-Pudding", type:"breakfast", prepMin:5,
    macros:{kcal:380,carbs:6,protein:15,fat:28},
    ingredients:["3 EL geschrotete Leinsamen","200ml ungesüßte Mandelmilch","½ TL Zimt","30g Walnüsse"],
    steps:"Abends: Leinsamen mit Mandelmilch und Zimt verrühren, abdecken und kühlen. Morgens Walnüsse drüber.",
    tags:["pcos","prep","lowgi"], batchDays:3},

  {id:"bf_p4", name:"Hummus-Vollkornbrot", type:"breakfast", prepMin:5,
    macros:{kcal:390,carbs:35,protein:14,fat:18},
    ingredients:["1 Scheibe Vollkornbrot","3 EL Hummus","2 EL Hanfsamen","4 Radieschen in Scheiben"],
    steps:"Vollkornbrot mit Hummus bestreichen, Radieschen auflegen und Hanfsamen (extra Protein!) bestreuen.",
    tags:["pcos","vegan","schnell"], batchDays:1},

  {id:"bf_p5", name:"Eier-Muffins mit Paprika", type:"breakfast", prepMin:10,
    macros:{kcal:320,carbs:4,protein:22,fat:20},
    ingredients:["3 Eier","½ rote Paprika gewürfelt","20g Feta zerbröckelt","Kräuter nach Wahl"],
    steps:"Abends: Eier verquirlen, Paprika und Feta einrühren, in Muffinförmchen bei 180°C 20 Min backen. Morgens kalt oder kurz erwärmt essen.",
    tags:["pcos","protein","prep"], batchDays:4},

  {id:"bf_p6", name:"Nussiger Protein-Shake", type:"breakfast", prepMin:3,
    macros:{kcal:410,carbs:12,protein:32,fat:22},
    ingredients:["300ml Hafermilch (ungesüßt)","1 Messlöffel Vanille-Proteinpulver","1 EL Erdnussmus (ohne Zucker)"],
    steps:"Alle Zutaten in den Mixer geben und 30 Sekunden pürieren. Schnellste Option für stressige Morgen.",
    tags:["protein","schnell","muskelaufbau"], batchDays:1},

  {id:"bf_p7", name:"Tomaten-Feta-Rührei", type:"breakfast", prepMin:8,
    macros:{kcal:370,carbs:5,protein:24,fat:26},
    ingredients:["3 Eier","5 Cherrytomaten halbiert","30g Feta","Italienische Kräuter","1 TL Olivenöl"],
    steps:"Öl erhitzen, Tomaten kurz anbraten. Eier verquirlt dazugeben und sanft rühren. Feta am Ende kurz einschmelzen.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"bf_p8", name:"Chia-Kokos-Pudding", type:"breakfast", prepMin:5,
    macros:{kcal:350,carbs:10,protein:12,fat:25},
    ingredients:["3 EL Chiasamen","150ml Kokosmilch aus der Dose","½ TL Vanilleextrakt","Handvoll Himbeeren"],
    steps:"Abends: Chiasamen mit Kokosmilch und Vanille verrühren und kühlen lassen. Morgens mit Himbeeren genießen.",
    tags:["pcos","prep","lowgi"], batchDays:3},

  {id:"bf_p9", name:"Räuchertofu-Stulle", type:"breakfast", prepMin:7,
    macros:{kcal:430,carbs:32,protein:25,fat:20},
    ingredients:["1 Scheibe Vollkornbrot","100g Räuchertofu in dünnen Scheiben","1 TL Senf","Gurkenscheiben"],
    steps:"Brot mit Senf bestreichen. Räuchertofu dünn aufschneiden und mit Gurkenscheiben belegen.",
    tags:["protein","vegan","schnell"], batchDays:1},

  {id:"bf_p10", name:"Griechischer Joghurt Spezial", type:"breakfast", prepMin:5,
    macros:{kcal:360,carbs:14,protein:28,fat:18},
    ingredients:["250g griech. Joghurt (5%)","1 EL Sonnenblumenkerne","½ TL Zimt","1 TL Honig optional"],
    steps:"Joghurt mit Zimt cremig rühren. Mit Sonnenblumenkernen bestreuen und ggf. wenig Honig beträufeln.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"bf_p11", name:"Zucchini-Omelett", type:"breakfast", prepMin:10,
    macros:{kcal:330,carbs:6,protein:22,fat:22},
    ingredients:["2 Eier","100g Zucchini grob geraspelt","2 EL Parmesan gerieben","Salz, Pfeffer","1 TL Olivenöl"],
    steps:"Zucchini mit Küchentuch ausdrücken. Mit verquirlten Eiern und Parmesan mischen. In Öl bei mittlerer Hitze stocken lassen.",
    tags:["pcos","protein","lowgi"], batchDays:1},

  {id:"bf_p12", name:"Sojaschnetzel-Pfanne", type:"breakfast", prepMin:10,
    macros:{kcal:380,carbs:12,protein:35,fat:12},
    ingredients:["50g Sojaschnetzel (trocken)","200ml Gemüsebrühe","½ Zwiebel gewürfelt","Paprikapulver","1 TL Olivenöl"],
    steps:"Abends: Sojaschnetzel in Brühe einweichen. Morgens: Zwiebel anbraten, Schnetzel ausdrücken und kross mitbraten.",
    tags:["protein","vegan","prep"], batchDays:2},

  {id:"bf_p13", name:"Mandelmus-Quark", type:"breakfast", prepMin:5,
    macros:{kcal:400,carbs:10,protein:32,fat:24},
    ingredients:["200g Magerquark","2 EL Mandelmus","2-3 EL Wasser","Prise Zimt"],
    steps:"Quark mit Mandelmus und Wasser zu einer cremigen Masse rühren. Extrem sättigend durch gesunde Fette.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"bf_p14", name:"Avocado-Ei-Creme", type:"breakfast", prepMin:6,
    macros:{kcal:420,carbs:9,protein:16,fat:35},
    ingredients:["1 reife Avocado","2 hartgekochte Eier (abends kochen)","Saft ½ Zitrone","Salz, Pfeffer","Chiliflocken"],
    steps:"Avocado zerdrücken, hartgekochte Eier grob hacken und untermischen. Mit Zitrone und Chili abschmecken.",
    tags:["pcos","lowgi","schnell"], batchDays:1},

  {id:"bf_p15", name:"Protein-Overnight-Oats", type:"breakfast", prepMin:5,
    macros:{kcal:450,carbs:40,protein:30,fat:10},
    ingredients:["50g Vollkorn-Haferflocken","150ml Hafermilch (ungesüßt)","1 Messlöffel Proteinpulver","1 EL Chiasamen"],
    steps:"Abends: Alle Zutaten im Glas mischen und gut schütteln. Morgens direkt fertig – ggf. mit Beeren toppen.",
    tags:["protein","prep","muskelaufbau"], batchDays:3},

  {id:"bf_p16", name:"Hüttenkäse-Bowl mit Zimt", type:"breakfast", prepMin:4,
    macros:{kcal:290,carbs:12,protein:28,fat:10},
    ingredients:["200g Hüttenkäse","Prise Zimt","5 Walnüsse grob gehackt","5 Heidelbeeren"],
    steps:"Hüttenkäse in Schüssel geben, mit Zimt bestreuen, Walnüsse und Heidelbeeren drüber. Erstaunlich gut ohne Zucker.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"bf_p17", name:"Spiegelei auf Spinatbett", type:"breakfast", prepMin:9,
    macros:{kcal:340,carbs:4,protein:20,fat:24},
    ingredients:["2 Eier","150g TK-Blattspinat","1 Knoblauchzehe","Muskat","1 TL Olivenöl"],
    steps:"Spinat in Öl mit Knoblauch bei mittlerer Hitze auftauen und dünsten. Eier direkt darauf aufschlagen und stocken lassen.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"bf_p18", name:"Skyr mit Hanfsamen", type:"breakfast", prepMin:3,
    macros:{kcal:310,carbs:10,protein:34,fat:12},
    ingredients:["300g Skyr natur","3 EL Hanfsamen","½ TL Vanilleextrakt"],
    steps:"Skyr mit Vanille in Schüssel geben und Hanfsamen drüberstreuen. Höchster Proteingehalt bei null Aufwand.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"bf_p19", name:"Kichererbsen-Pfannkuchen", type:"breakfast", prepMin:10,
    macros:{kcal:390,carbs:42,protein:22,fat:10},
    ingredients:["60g Kichererbsenmehl","120ml Wasser","½ TL Kurkuma","Kräuter nach Wahl","1 TL Olivenöl"],
    steps:"Abends: Teig aus Mehl, Wasser und Gewürzen glatt rühren, kühlen. Morgens wie ein Omelett in Öl goldbraun ausbacken.",
    tags:["pcos","vegan","prep"], batchDays:1},

  {id:"bf_p20", name:"Frühstücks-Burrito", type:"breakfast", prepMin:10,
    macros:{kcal:440,carbs:25,protein:24,fat:22},
    ingredients:["1 Vollkorn-Tortilla","2 Eier","4 EL schwarze Bohnen aus der Dose","½ Avocado","Chiliflocken"],
    steps:"Eier scramble braten. Tortilla belegen mit Bohnen, Rührei und Avocadoscheiben. Einrollen. Power-Frühstück.",
    tags:["protein","muskelaufbau","schnell"], batchDays:1},


  // ══════════════════════════════════════════════════════════
  //  MITTAGESSEN (r41 – r60)
  //  Proteinreich, Low-GI, PCOS-freundlich, Batch-geeignet
  // ══════════════════════════════════════════════════════════
  {id:"r41", name:"Linsensalat mit Apfel & Walnuss", type:"lunch", prepMin:15,
    macros:{kcal:480,carbs:45,protein:20,fat:22},
    ingredients:["100g Berglinsen (gegart)","1 Apfel gewürfelt","30g Walnüsse grob gehackt","2 EL Apfelessig","1 EL Olivenöl","Senf"],
    steps:"Gegarte Linsen abkühlen lassen. Apfel würfeln. Dressing aus Essig, Öl und Senf anrühren. Alles mischen.",
    tags:["pcos","lowgi","legumes"], batchDays:2},

  {id:"r42", name:"Tofu-Bolognese mit Zucchini-Nudeln", type:"lunch", prepMin:20,
    macros:{kcal:410,carbs:15,protein:32,fat:22},
    ingredients:["200g fester Tofu (zerbröselt)","2 Zucchini (Spiralschneider)","2 EL Tomatenmark","1 Dose Tomaten","Oregano","Knoblauch"],
    steps:"Tofu wie Hackfleisch in Öl kross anbraten. Knoblauch, Tomatenmark und Tomaten dazugeben, 10 Min köcheln. Über Zoodles servieren.",
    tags:["pcos","protein","lowgi"], batchDays:2},

  {id:"r43", name:"Kichererbsen-Pasta mit Pesto", type:"lunch", prepMin:12,
    macros:{kcal:560,carbs:55,protein:28,fat:24},
    ingredients:["80g Kichererbsen-Pasta","2 EL grünes Pesto","Handvoll Kirschtomaten","Parmesan zum Bestreuen"],
    steps:"Pasta nach Packungsanleitung kochen (viel Eigeneiweiß!). Abgießen, Pesto einrühren, Tomaten dazu.",
    tags:["protein","muskelaufbau","schnell"], batchDays:1},

  {id:"r44", name:"Griechische Bowl mit Tempeh", type:"lunch", prepMin:15,
    macros:{kcal:520,carbs:18,protein:30,fat:35},
    ingredients:["150g Tempeh in Würfeln","1 Gurke gewürfelt","Handvoll Kalamata-Oliven","50g Feta zerbröckelt","2 EL Tzatziki","Oregano"],
    steps:"Tempeh in Öl knusprig braten. Mit Gurke, Oliven und Feta anrichten. Tzatziki darüber, Oregano bestreuen.",
    tags:["pcos","protein","legumes"], batchDays:1},

  {id:"r45", name:"Weißer-Bohnen-Eintopf", type:"lunch", prepMin:25,
    macros:{kcal:440,carbs:48,protein:22,fat:8},
    ingredients:["1 Dose weiße Bohnen (400g)","Suppengemüse (Möhre, Sellerie, Lauch)","Majoran","500ml Gemüsebrühe","Salz, Pfeffer"],
    steps:"Gemüse klein schneiden und andünsten. Mit Brühe aufgießen, Bohnen dazugeben. 15 Min köcheln und mit Majoran abschmecken.",
    tags:["pcos","legumes","batch"], batchDays:3},

  {id:"r46", name:"Halloumi auf Linsenbett", type:"lunch", prepMin:20,
    macros:{kcal:580,carbs:35,protein:32,fat:36},
    ingredients:["125g Halloumi in Scheiben","100g rote Linsen","300ml Gemüsebrühe","Saft 1 Zitrone","Petersilie","Paprikapulver"],
    steps:"Rote Linsen in Brühe 12 Min kochen bis weich. Halloumi trocken in der Pfanne goldbraun braten. Linsen mit Zitrone würzen, Halloumi darauf.",
    tags:["pcos","protein","legumes"], batchDays:1},

  {id:"r47", name:"Quinoa-Gemüse-Pfanne", type:"lunch", prepMin:20,
    macros:{kcal:490,carbs:55,protein:18,fat:18},
    ingredients:["70g Quinoa","250g TK-Gemüsemix","2 EL Tamari","1 TL Sesamöl","Ingwer","Knoblauch"],
    steps:"Quinoa in doppelter Wassermenge kochen (15 Min). TK-Gemüse in Öl anbraten, Quinoa dazugeben, mit Tamari und Ingwer würzen.",
    tags:["pcos","vegan","batch"], batchDays:2},

  {id:"r48", name:"Brokkoli-Tofu-Auflauf", type:"lunch", prepMin:35,
    macros:{kcal:470,carbs:12,protein:28,fat:32},
    ingredients:["300g Brokkoli in Röschen","200g fester Tofu","100ml Hafer-Kochsahne","80g geriebener Käse","Muskat","Salz"],
    steps:"Tofu würfeln und anbraten. Brokkoli blanchieren. Alles in Form schichten, Sahne und Käse drüber. Bei 180°C 20 Min backen.",
    tags:["protein","batch","pcos"], batchDays:2},

  {id:"r49", name:"Scharfe Kidneybohnen-Pfanne", type:"lunch", prepMin:15,
    macros:{kcal:450,carbs:52,protein:24,fat:10},
    ingredients:["1 Dose Kidneybohnen (400g)","1 rote Paprika","1 Zwiebel","1 TL Chiliflocken","Paprikapulver","Tomatenmark"],
    steps:"Zwiebel und Paprika anbraten. Tomatenmark kurz rösten, Chili und Paprikapulver dazu. Bohnen mit etwas Wasser dazugeben, 10 Min köcheln.",
    tags:["pcos","legumes","vegan"], batchDays:2},

  {id:"r50", name:"Gebackene Avocado mit Ei", type:"lunch", prepMin:20,
    macros:{kcal:430,carbs:8,protein:16,fat:38},
    ingredients:["1 reife Avocado","2 Eier","Chilisalz","Schnittlauch","Pfeffer"],
    steps:"Avocado halbieren und Kern entfernen. Mulde ggf. etwas vergrößern. Ei in jede Hälfte schlagen. Bei 200°C 12-15 Min backen.",
    tags:["pcos","lowgi","protein"], batchDays:1},

  {id:"r51", name:"Beluga-Linsen mit Ziegenkäse", type:"lunch", prepMin:25,
    macros:{kcal:510,carbs:40,protein:25,fat:26},
    ingredients:["80g Beluga-Linsen","50g Ziegenkäse (Rolle)","Babyspinat","Balsamico","Olivenöl","Senf"],
    steps:"Linsen in Salzwasser 20 Min kochen. Dressing aus Balsamico, Öl und Senf. Linsen mit Spinat mischen, Ziegenkäse drüber bröseln.",
    tags:["pcos","legumes","protein"], batchDays:2},

  {id:"r52", name:"Sojageschnetzeltes mit Pilzen", type:"lunch", prepMin:20,
    macros:{kcal:490,carbs:15,protein:38,fat:28},
    ingredients:["60g Sojaschnetzel (eingeweicht)","250g Champignons","1 Zwiebel","100ml Gemüsebrühe","Petersilie","Olivenöl"],
    steps:"Sojaschnetzel gut ausdrücken. Mit Zwiebeln und Pilzen scharf anbraten. Brühe dazugeben und einköcheln lassen.",
    tags:["protein","vegan","muskelaufbau"], batchDays:2},

  {id:"r53", name:"Süßkartoffel-Curry mit Erbsen", type:"lunch", prepMin:30,
    macros:{kcal:460,carbs:55,protein:18,fat:16},
    ingredients:["1 Süßkartoffel (350g) gewürfelt","150g Erbsen (TK)","400ml Kokosmilch","2 EL rote Currypaste","Ingwer","Koriander"],
    steps:"Süßkartoffelwürfel in Kokosmilch mit Currypaste 15 Min garen. Erbsen die letzten 3 Min mitkochen. Koriander drüber.",
    tags:["pcos","vegan","batch"], batchDays:2},

  {id:"r54", name:"Mediteraner Bulgur-Salat", type:"lunch", prepMin:15,
    macros:{kcal:420,carbs:58,protein:14,fat:15},
    ingredients:["60g Vollkorn-Bulgur","Minze frisch","2 Tomaten","1 Gurke","Petersilie","Olivenöl","Zitronensaft"],
    steps:"Bulgur mit kochendem Wasser übergießen (1:1,5), 10 Min quellen lassen. Gemüse fein würfeln und mit Kräutern unterheben.",
    tags:["pcos","vegan","lowgi"], batchDays:2},

  {id:"r55", name:"Tofu-Spieße mit Erdnusssauce", type:"lunch", prepMin:20,
    macros:{kcal:550,carbs:14,protein:30,fat:42},
    ingredients:["200g fester Tofu in Würfeln","2 EL Erdnussmus (ohne Zucker)","2 EL Tamari","Ingwer","Limettensaft","Wasser"],
    steps:"Tofu aufspießen und bei hoher Hitze anbraten. Sauce aus Erdnussmus, Tamari, Ingwer, Limette und Wasser anrühren.",
    tags:["protein","pcos","muskelaufbau"], batchDays:1},

  {id:"r56", name:"Blumenkohlreis mit Paneer", type:"lunch", prepMin:20,
    macros:{kcal:480,carbs:12,protein:26,fat:35},
    ingredients:["300g Blumenkohl (geraspelt = Reis)","100g Paneer (indischer Käse)","½ TL Kurkuma","Kreuzküm","Olivenöl"],
    steps:"Paneer würfeln und goldbraun braten. Blumenkohlreis mit Kurkuma und Kreuzkümmel 5 Min mitdünsten.",
    tags:["pcos","protein","lowgi"], batchDays:1},

  {id:"r57", name:"Schwarze-Linsen-Bowl mit Tahini", type:"lunch", prepMin:25,
    macros:{kcal:530,carbs:48,protein:28,fat:22},
    ingredients:["80g schwarze Linsen (Beluga)","Babyspinat","2 EL Tahini","Saft 1 Zitrone","1 Knoblauchzehe","Sesam"],
    steps:"Linsen 20 Min kochen. Tahini-Dressing: Tahini, Zitrone, Knoblauch, Wasser verrühren. Linsen auf Spinat, Dressing drüber.",
    tags:["pcos","protein","legumes"], batchDays:2},

  {id:"r58", name:"Veganes Chili sin Carne", type:"lunch", prepMin:30,
    macros:{kcal:470,carbs:50,protein:25,fat:12},
    ingredients:["100g Sojahack (eingeweicht)","1 Dose Kidneybohnen","1 Dose Tomaten","1 Paprika","Chiliflocken","Cumin","Koriander"],
    steps:"Sojahack ausdrücken und anbraten. Mit Gewürzen rösten. Bohnen und Tomaten dazu, 20 Min einkochen lassen.",
    tags:["protein","vegan","batch"], batchDays:3},

  {id:"r59", name:"Gefüllte Zucchini mit Ricotta", type:"lunch", prepMin:35,
    macros:{kcal:390,carbs:12,protein:22,fat:28},
    ingredients:["2 Zucchini","150g Ricotta","2 EL Parmesan gerieben","Basilikum","Knoblauch","Salz, Pfeffer"],
    steps:"Zucchini längs halbieren und aushöhlen. Ricotta mit Parmesan, Basilikum und Knoblauch mischen, einfüllen. 20 Min bei 180°C backen.",
    tags:["pcos","protein","lowgi"], batchDays:2},

  {id:"r60", name:"Kürbis-Linsen-Pfanne", type:"lunch", prepMin:25,
    macros:{kcal:440,carbs:45,protein:20,fat:18},
    ingredients:["300g Hokkaido-Kürbis (Würfel)","100g rote Linsen","Rosmarin","Knoblauch","300ml Gemüsebrühe","Olivenöl"],
    steps:"Kürbis und Linsen mit Knoblauch und Rosmarin in Brühe garen bis beides weich ist. Mit Olivenöl abschmecken.",
    tags:["pcos","legumes","batch"], batchDays:2},


  // ══════════════════════════════════════════════════════════
  //  ABENDESSEN (r61 – r80)
  //  Leicht bis sättigend, proteinreich, Low-GI
  // ══════════════════════════════════════════════════════════
  {id:"r61", name:"Griechischer Salat mit Ei", type:"dinner", prepMin:10,
    macros:{kcal:380,carbs:8,protein:18,fat:30},
    ingredients:["2 Eier (hartgekocht)","1 Gurke","2 Tomaten","Handvoll Kalamata-Oliven","80g Feta","Oregano","Olivenöl"],
    steps:"Alles würfeln. Eier vierteln und dazugeben. Olivenöl, Oregano und Salz drüber. Klassisch und gut.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"r62", name:"Gebackener Camembert mit Walnüssen", type:"dinner", prepMin:15,
    macros:{kcal:520,carbs:5,protein:28,fat:45},
    ingredients:["125g Camembert (im Töpfchen)","30g Walnüsse grob gehackt","1 TL frischer Thymian"],
    steps:"Camembert in seiner Holzschachtel bei 200°C 12 Min backen bis er weich ist. Walnüsse und Thymian drüber geben.",
    tags:["pcos","protein","lowgi"], batchDays:1},

  {id:"r63", name:"Spinat-Ei-Pfanne", type:"dinner", prepMin:10,
    macros:{kcal:310,carbs:6,protein:24,fat:22},
    ingredients:["3 Eier","200g Blattspinat (frisch oder TK)","1 Knoblauchzehe","Muskat","1 TL Olivenöl"],
    steps:"Knoblauch in Öl anbraten, Spinat dazugeben und zusammenfallen lassen. Eier direkt in die Pfanne schlagen und stocken lassen.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"r64", name:"Räuchertofu-Carpaccio", type:"dinner", prepMin:10,
    macros:{kcal:340,carbs:4,protein:26,fat:25},
    ingredients:["200g Räuchertofu","2 EL Olivenöl","Saft ½ Zitrone","Rucola","Kapern","Pfeffer"],
    steps:"Räuchertofu hauchdünn aufschneiden und fächerförmig auf Rucola anrichten. Mit Olivenöl, Zitrone und Kapern marinieren.",
    tags:["protein","vegan","schnell"], batchDays:1},

  {id:"r65", name:"Gefüllte Champignons", type:"dinner", prepMin:25,
    macros:{kcal:320,carbs:8,protein:18,fat:22},
    ingredients:["6 große Champignons","150g Frischkäse","Kräuter (Schnittlauch, Petersilie)","40g Gouda gerieben"],
    steps:"Pilze entstielen. Frischkäse mit Kräutern mischen und in die Pilze füllen. Gouda drüber und 15 Min bei 200°C backen.",
    tags:["pcos","protein","lowgi"], batchDays:1},

  {id:"r66", name:"Lupinen-Salat mit Paprika", type:"dinner", prepMin:12,
    macros:{kcal:390,carbs:15,protein:32,fat:18},
    ingredients:["150g Lupinenfilet (fertig gewürzt)","2 Paprika (verschiedene Farben)","½ rote Zwiebel","Essig-Öl-Dressing"],
    steps:"Lupinen in Öl bei starker Hitze 3 Min anbraten. Paprika und Zwiebel in Streifen schneiden und mit Dressing mischen.",
    tags:["pcos","protein","legumes"], batchDays:1},

  {id:"r67", name:"Rührei mit Avocado", type:"dinner", prepMin:8,
    macros:{kcal:450,carbs:7,protein:20,fat:38},
    ingredients:["3 Eier","½ Avocado in Würfeln","1 EL Leinsamen","Chiliflocken","1 TL Butter"],
    steps:"Eier in Butter sanft stocken lassen. Kurz vor Ende Avocadowürfel unterheben. Mit Leinsamen und Chili bestreuen.",
    tags:["pcos","lowgi","protein"], batchDays:1},

  {id:"r68", name:"Edamame-Pfanne mit Sesam", type:"dinner", prepMin:10,
    macros:{kcal:360,carbs:12,protein:22,fat:24},
    ingredients:["200g Edamame (ausgelöst, TK)","1 TL Sesamöl","Chiliflocken","2 EL Tamari","1 EL Sesam"],
    steps:"Edamame in Sesamöl bei hoher Hitze 3 Min anbraten. Tamari und Chili dazugeben, kurz schwenken. Mit Sesam bestreuen.",
    tags:["pcos","protein","vegan"], batchDays:1},

  {id:"r69", name:"Mozzarella-Tomaten-Spieße", type:"dinner", prepMin:10,
    macros:{kcal:410,carbs:6,protein:24,fat:32},
    ingredients:["125g Mozzarella-Mini-Bällchen","Cherrytomaten","Basilikum frisch","Olivenöl","Balsamico-Reduktion (ohne Zucker)"],
    steps:"Mozzarella und Tomaten abwechselnd aufspießen, Basilikumblatt dazwischen. Mit Olivenöl und Balsamico beträufeln.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"r70", name:"Ofenspargel mit Spiegelei", type:"dinner", prepMin:20,
    macros:{kcal:340,carbs:10,protein:20,fat:25},
    ingredients:["500g grüner Spargel","2 Eier","1 EL Butter","Parmesan gehobelt","Salz, Pfeffer"],
    steps:"Spargel mit Olivenöl, Salz bei 200°C 15 Min backen. Spiegelei in Butter braten. Spiegelei auf Spargel, Parmesan drüber.",
    tags:["pcos","protein","lowgi"], batchDays:1},

  {id:"r71", name:"Tempeh-Salat Asiatisch", type:"dinner", prepMin:15,
    macros:{kcal:430,carbs:14,protein:28,fat:28},
    ingredients:["150g Tempeh","½ Chinakohl fein geschnitten","Karotte geraspelt","2 EL Erdnussmus","Tamari","Ingwer","Limette"],
    steps:"Tempeh in Würfeln scharf anbraten. Dressing aus Erdnussmus, Tamari, Ingwer und Limette. Über Kohl und Karotten geben, Tempeh obendrauf.",
    tags:["pcos","protein","legumes"], batchDays:1},

  {id:"r72", name:"Hüttenkäse mit Kräutern & Kräcker", type:"dinner", prepMin:5,
    macros:{kcal:280,carbs:8,protein:30,fat:10},
    ingredients:["250g Hüttenkäse","Schnittlauch und Petersilie","2 Vollkornkräcker","Pfeffer","Paprikapulver"],
    steps:"Hüttenkäse mit Kräutern und Paprikapulver mischen. Mit Kräckern servieren. Maximale Proteindichte bei minimalem Aufwand.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"r73", name:"Zucchini-Feta-Frittata", type:"dinner", prepMin:20,
    macros:{kcal:390,carbs:9,protein:22,fat:30},
    ingredients:["3 Eier","1 kleine Zucchini geraspelt","80g Feta zerbröckelt","Minze frisch","Olivenöl"],
    steps:"Zucchini ausdrücken. Eimasse mit Zucchini, Feta und Minze mischen. In ofenfestem Gerät anbraten, dann 10 Min bei 180°C fertigbacken.",
    tags:["pcos","protein","lowgi"], batchDays:2},

  {id:"r74", name:"Gefüllte Tomaten mit Couscous", type:"dinner", prepMin:25,
    macros:{kcal:370,carbs:40,protein:12,fat:15},
    ingredients:["4 große Fleischtomaten","40g Vollkorn-Couscous","2 EL Pinienkerne","Basilikum","Olivenöl"],
    steps:"Tomaten aushöhlen, Fruchtfleisch klein hacken. Couscous mit kochendem Wasser quellen lassen, mit Tomaten und Pinienkernen mischen, füllen und 15 Min backen.",
    tags:["pcos","vegan","lowgi"], batchDays:1},

  {id:"r75", name:"Brokkoli-Rohkost-Salat", type:"dinner", prepMin:12,
    macros:{kcal:350,carbs:14,protein:14,fat:25},
    ingredients:["300g Brokkoli (sehr fein gehackt)","1 Apfel gewürfelt","30g Mandeln","4 EL Joghurt-Dressing"],
    steps:"Brokkoli sehr fein hacken. Mit Apfel, Mandeln und Joghurtdressing mischen. 10 Min ziehen lassen.",
    tags:["pcos","lowgi","schnell"], batchDays:2},

  {id:"r76", name:"Quark-Bowl herzhaft mit Beeren", type:"dinner", prepMin:5,
    macros:{kcal:320,carbs:15,protein:30,fat:12},
    ingredients:["250g Magerquark","Handvoll Heidelbeeren","2 EL Kürbiskerne","½ TL Zimt"],
    steps:"Quark cremig rühren. Beeren und Kerne drauflegen, Zimt bestreuen. Überraschend gut als leichtes Abendessen.",
    tags:["pcos","protein","schnell"], batchDays:1},

  {id:"r77", name:"Wok-Gemüse mit Erdnüssen", type:"dinner", prepMin:15,
    macros:{kcal:440,carbs:18,protein:15,fat:32},
    ingredients:["500g gemischtes Wok-Gemüse","40g ungesalzene Erdnüsse","2 TL frischer Ingwer","2 EL Tamari","1 TL Sesamöl"],
    steps:"Gemüse bei sehr hoher Hitze 5-7 Min scharf woken. Ingwer und Tamari dazu. Am Ende Sesamöl und Erdnüsse unterrühren.",
    tags:["pcos","vegan","schnell"], batchDays:1},

  {id:"r78", name:"Lupinen-Bällchen mit Kräuterquark", type:"dinner", prepMin:20,
    macros:{kcal:460,carbs:20,protein:28,fat:24},
    ingredients:["1 Packung Lupinen-Bällchen (Fertigprodukt)","150g Magerquark","Schnittlauch","Knoblauchpulver"],
    steps:"Lupinen-Bällchen in Öl goldbraun braten. Kräuterquark aus Quark, Schnittlauch und Knoblauchpulver anrühren. Zusammen servieren.",
    tags:["pcos","protein","legumes"], batchDays:1},

  {id:"r79", name:"Aubergine mit Miso-Glasur", type:"dinner", prepMin:30,
    macros:{kcal:310,carbs:15,protein:10,fat:22},
    ingredients:["1 Aubergine","2 EL helle Miso-Paste","1 TL Sesamöl","1 TL Reisessig","Sesam","Frühlingszwiebeln"],
    steps:"Aubergine halbieren und einritzen. Miso-Glasur aus Paste, Sesamöl und Reisessig. Auf Aubergine pinseln und bei 200°C 20 Min backen, dann 5 Min grillen.",
    tags:["pcos","vegan","lowgi"], batchDays:1},

  {id:"r80", name:"Protein-Omelett mit Pilzen", type:"dinner", prepMin:12,
    macros:{kcal:380,carbs:6,protein:26,fat:28},
    ingredients:["3 Eier","200g Champignons in Scheiben","½ Zwiebel","Petersilie","1 TL Butter","Salz, Pfeffer"],
    steps:"Zwiebel und Pilze in Butter anbraten bis goldbraun. Verquirlte Eier drübergießen, stocken lassen, falten.",
    tags:["pcos","protein","schnell"], batchDays:1}

]; // Ende window.RECIPES
