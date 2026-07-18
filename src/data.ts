import { Pose, Elixir, Recipe, LogEntry } from './types';

export const POSES: Record<string, Pose> = {
  gases: {
    id: 'gases',
    name: 'Apanasana',
    subtitle: '"Rodillas al pecho"',
    target: 'Gases',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5hNLngTFTwRQhb9LKszGOMG_IQmMy-nez-RaGud5vVevz8sXo5PIUgjBaqGyFGVct_pJvTLvTwBUM7lS7FO6zUkGQkZSlquhgcaIxb0Hx8Va26E5Z-rslveZSOXRG173nSOW1G9Qjo4ZYj1cAGIX2fA3SrmD9KrNItBuaUs20oPMGw5AvV6MkL4ExaCUqFGfmrEK0q81ziEV-RTWkcIGkT3i7IP6_KAXHaShlEZDrU9mmN5HqQAWtCwcZZ40x1PB9TVIVb3_iX7Y',
    benefit: 'Estimula el tránsito intestinal y facilita la expulsión de gases atrapados.',
    steps: [
      'Túmbate boca arriba con la espalda bien apoyada en el suelo.',
      'Flexiona las rodillas y llévalas suavemente hacia el abdomen.',
      'Abraza tus piernas manteniendo los hombros relajados.'
    ]
  },
  pesadez: {
    id: 'pesadez',
    name: 'Balasana',
    subtitle: '"Postura del Niño"',
    target: 'Pesadez',
    image: 'https://lh3.googleusercontent.com/aida/AP1WRLuJ0lPCjL4HkIpOpWGr6g2zNaKoRTLPxRBdz6QAWX-WlR_Tr2WjjNhoGBfPpPDZa5Qwjq3TSlII2TIhrPITytDkKt9JlZVSOwUeE1df6g4VAv0tPgqZjKlK4seAzYG2_9IUqfArWUqZCE94LVkmCV-EIxSvq9j9-JsYH-7vh4xvVYgqQbatOIMPvH-Da6ydbe-LtXIQycNBC5DwSbTk_kEpDtj-7kbrAdLJCf1BGjX_9qG28U3t8_-gmw',
    benefit: 'Calma el sistema nervioso y masajea suavemente los órganos digestivos por compresión.',
    steps: [
      'Arrodíllate en el suelo, siéntate sobre tus talones.',
      'Inclina el torso hacia adelante hasta que tu frente toque el suelo.',
      'Estira los brazos hacia adelante o déjalos descansar a los costados.'
    ]
  },
  dolor: {
    id: 'dolor',
    name: 'Supta Matsyendrasana',
    subtitle: '"Torsión Espinal Supina"',
    target: 'Dolor e Inflamación',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCjfmAY6KBbb1hilScSaJQ9pMSSaCy-jyfkQ_xyAXjf_UEO-UZ1eFLX7CuzgjClFPcb829CPXErRqmwY0Rmu9tNgfJIr03Fohkr8aLVhUH3N2NFa6ragHfVad4fPlZT9d3w7qWc7dQAi6XTOsSGowLBHpXKkQ_XvI2QXXLOpq8QokLgmcNATmOR8E8ilWT_8E0dRGFT-hZcBRYCIc7I9RSg7YhV9WdxzbDCeo0zgq3BSldQngYoNpS7UfZxEtp_Pu914Za_eQN6ABk',
    benefit: 'Las torsiones ayudan a desintoxicar los órganos y aliviar la presión abdominal lateral.',
    steps: [
      'Boca arriba, lleva una rodilla al pecho y crúzala sobre el cuerpo.',
      'Mantén ambos hombros en el suelo y mira hacia el lado opuesto.',
      'Respira profundamente en la torsión durante 2.5 min por cada lado.'
    ]
  },
  acidez: {
    id: 'acidez',
    name: 'Supta Baddha Konasana',
    subtitle: '"Ángulo de Reclinación"',
    target: 'Acidez',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuANKlRVDwYFSUyl6d8RlQiNF8U4JIB5gv6yYT0boAVyPAZKxTICLBaY2jWn3kDnN6tZCiRfQKYxCHfCEceQGyIbev14r7ZAcAxXb6RTEhtCtRrSs1Ug8ufQltVInLtA4u6nCfWlwyHuhjT5a7IDQMtIfh-ZUIvX57lgKSw328tVygYfaCsQ3uNbfvRiF__SyPdtWTBS5HPNrTaMc4oWxFMj_lH-Dz96-LcCPR7I4sPZqkPHf-DzHe8LFCIea1k9b-d7lNTA7EeuM1c',
    benefit: 'Abre la cavidad abdominal superior, reduciendo la presión ascendente del ácido gástrico.',
    steps: [
      'Siéntate y junta las plantas de los pies dejando caer las rodillas.',
      'Recuéstate sobre un cojín largo (bolster) para elevar el pecho.',
      'Relaja los brazos a los lados y enfócate en expandir el diafragma.'
    ]
  }
};

export const ELIXIRS: Record<string, Elixir> = {
  dandelion: {
    id: 'dandelion',
    title: 'Diente de león',
    icon: 'Leaf',
    benefits: 'Estimula la producción de bilis y ayuda al hígado a procesar grasas, reduciendo la pesadez abdominal y la hinchazón.',
    steps: '1. Hierve 250ml de agua.\n2. Añade 1 cucharadita de hojas secas.\n3. Deja infusionar 5-8 minutos.\n4. Cuela y bebe templado.'
  },
  fennel: {
    id: 'fennel',
    title: 'Hinojo',
    icon: 'Sparkles',
    benefits: 'Poderoso carminativo que ayuda a expulsar gases y relaja los músculos del tracto digestivo, aliviando espasmos.',
    steps: '1. Machaca ligeramente 1 cucharadita de semillas.\n2. Añade agua hirviendo.\n3. Reposa durante 5 minutos.\n4. Bebe a sorbos pequeños después de las comidas.'
  },
  mint: {
    id: 'mint',
    title: 'Menta',
    icon: 'Sprout',
    benefits: 'Contiene mentol que actúa como antiespasmódico natural, ideal para calmar el dolor punzante y refrescar el sistema.',
    steps: '1. Usa 5-6 hojas de menta fresca.\n2. Vierte agua a 85°C (no hirviendo).\n3. Tapa la taza para no perder aceites esenciales.\n4. Infusiona 4 minutos.'
  },
  ginger: {
    id: 'ginger',
    title: 'Jengibre',
    icon: 'FlameKindling',
    benefits: 'El gingerol acelera el vaciado gástrico y reduce la inflamación sistémica, ideal contra náuseas y distensión.',
    steps: '1. Corta 3 rodajas finas de raíz fresca.\n2. Hierve con el agua durante 2 minutos.\n3. Retira del fuego y deja reposar 3 minutos más.\n4. Puedes añadir unas gotas de limón.'
  }
};

export const RECIPES = {
  pollo_arroz_zanahoria: {
    id: 'pollo_arroz_zanahoria',
    title: 'Arroz de Rescate con Pollo y Zanahoria',
    description: 'Una opción equilibrada de alta tolerancia con proteína magra y vegetales cocidos que protegen tu estómago.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHX1k7y2w_NAnS-Zz9rGjW0zUqQn0S-L4u8d8d7qR_w_x_z_y_x_w_v_u_t_s_r_q_p_o_n_m_l_k_j_i_h_g_f_e_d_c_b_a',
    protein: { label: 'Pollo Magro', icon: 'Egg' },
    ingredients: [
      '150g de pechuga de pollo (limpia, sin piel ni grasa)',
      '80g de arroz blanco de grano redondo (fácil absorción)',
      '1 zanahoria mediana (aprox. 100g), pelada y en rodajas finas',
      '600ml de caldo de verduras casero o agua mineral filtrada',
      '1 cucharadita de aceite de oliva virgen extra (en crudo)',
      'Una pizca pequeña de sal marina'
    ],
    steps: [
      { title: '1. Cocción de la Base', text: 'En una cazuela mediana, vierte los 600ml de agua o caldo junto con los 100g de zanahoria en rodajas finas y una pizca de sal marina. Lleva a ebullición a fuego medio durante unos 8 minutos hasta que la zanahoria comience a ablandarse.' },
      { title: '2. Incorporar la Proteína', text: 'Corta los 150g de pechuga de pollo en dados pequeños muy fáciles de masticar. Agrégalos a la cazuela junto con los vegetales y mantén un hervor suave durante 5 minutos para sellar y ablandar la carne.' },
      { title: '3. Cocinar el Arroz', text: 'Añade los 80g de arroz blanco. Reduce el fuego al mínimo, tapa la cazuela y deja cocer a fuego lento durante 18 minutos. Es ideal que el arroz quede muy blando (ligeramente pasado) para que el estómago no tenga que hacer esfuerzo mecánico en digerirlo.' },
      { title: '4. Reposo y Sazonado', text: 'Apaga el fuego y deja reposar la preparación tapada durante 5 minutos para que absorba todo el líquido y los sabores. Sirve templado en un plato hondo y añade la cucharadita de aceite de oliva en crudo para aportar grasas saludables y antiinflamatorias.' }
    ]
  },
  pescado_patata_calabaza: {
    id: 'pescado_patata_calabaza',
    title: 'Merluza al Vapor sobre Puré de Patata y Calabaza',
    description: 'Proteína marina de máxima asimilación con un puré reconfortante y rico en mucílagos que calman la mucosa.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-3o_hS2Z-vE_Xp4rWqU_u_v_w_x_y_z_0_1_2_3_4_5_6_7_8_9_A_B_C_D_E_F',
    protein: { label: 'Pescado Blanco', icon: 'Fish' },
    ingredients: [
      '150g de filete de pescado blanco limpio (merluza, lenguado o bacalao fresco)',
      '1 patata mediana (aprox. 150g), pelada y troceada',
      '120g de calabaza dulce madura, pelada y sin semillas',
      '1 cucharada sopera de aceite de oliva virgen extra de primera presión',
      'Una pizca de sal marina',
      'Unas hojitas de eneldo fresco picado (excelente digestivo)'
    ],
    steps: [
      { title: '1. Cocinar los Tubérculos', text: 'Corta los 150g de patata y los 120g de calabaza en trozos medianos y homogéneos. Colócalos en una olla al vapor o hiérvelos en abundante agua con una pizca de sal marina durante 15 minutos, hasta que puedas pincharlos con facilidad.' },
      { title: '2. Vapor del Pescado', text: 'Coloca el filete de pescado blanco (150g) directamente encima de las verduras en la vaporera (o usa un colador metálico sobre la olla con las verduras hirviendo). Tapa bien y cocina al vapor suave durante 6 a 8 minutos, hasta que las lascas se separen de forma natural.' },
      { title: '3. Elaboración del Puré Sedoso', text: 'Retira la patata y la calabaza cocidas. Colócalas en un cuenco hondo y aplástalas con un tenedor o pasapurés. Añade la cucharada de aceite de oliva virgen extra y de 2 a 3 cucharadas del caldo sobrante para lograr una consistencia cremosa, suave y libre de grumos.' },
      { title: '4. Emplatar y Sazonar', text: 'Extiende el puré templado de patata y calabaza en un plato plano. Dispón encima el pescado blanco desmenuzado y espolvorea un poco de eneldo fresco para aliviar los gases. Consume templado de inmediato.' }
    ]
  },
  arroz_zanahoria_patata: {
    id: 'arroz_zanahoria_patata',
    title: 'Sopa Crema de Arroz con Zanahoria y Patata',
    description: 'La opción clásica más blanda y astringente para combatir la acidez, el reflujo y la irritación intestinal.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_5rT9_q_p_o_n_m_l_k_j_i_h_g_f_e_d_c_b_a_0_9_8_7_6_5_4_3_2_1',
    ingredients: [
      '80g de arroz blanco redondo',
      '1 patata pequeña (aprox. 100g), pelada y cortada en cubitos muy pequeños',
      '1 zanahoria mediana (aprox. 100g), pelada y finamente rallada',
      '700ml de agua purificada',
      '1 cucharadita de aceite de oliva virgen extra',
      'Una pizca de sal marina'
    ],
    steps: [
      { title: '1. Preparar el Caldo Base', text: 'En una olla pequeña, vierte los 700ml de agua purificada con la patata picada (al estar fina soltará más almidón espesante) y la zanahoria finamente rallada. Añade la pizca de sal y lleva a ebullición rápida a fuego medio.' },
      { title: '2. Cocción del Arroz', text: 'Cuando rompa a hervir, añade los 80g de arroz blanco de grano redondo. Cocina a fuego medio-bajo durante 20 minutos removiendo de vez en cuando. La clave es que el grano se abra del todo para liberar los almidones suavizantes.' },
      { title: '3. Textura Melosa Estomacal', text: 'Una vez transcurrido el tiempo, asegúrate de que quede una consistencia caldosa y muy suave (si ves que se seca, añade 50ml adicionales de agua templada). La textura debe asemejarse a una avena ligera.' },
      { title: '4. Servir a Temperatura Corporal', text: 'Vierte en un plato hondo, riega con la cucharadita de aceite de oliva virgen extra en crudo y mezcla bien. Deja entibiar hasta temperatura ambiente antes de ingerir lentamente.' }
    ]
  },
  calabaza_zanahoria_patata: {
    id: 'calabaza_zanahoria_patata',
    title: 'Crema de Tres Verduras de Rescate (100% Vegetal)',
    description: 'Una deliciosa opción puramente vegetal repleta de betacarotenos y almidones reparadores para desinflamar las mucosas del colon.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4rtc_WY3I-ShmCgj5m47FXkTd07rSg7IM2m4o_rDyTv_sBBXcGmZglbNy52jKU0k8PAxHT-10I77wYkyV4sDDUCrtsBTmYqFsgb5zY_4Hfxttx8_jBVEzlo9Mtb1-vpvtev76ySQHZrcPU2jDELZDRLKDlMn5kWk8Hc9NVX5cmpSqSzQa2RMO8vMasQ1oIjoOyTeHr6HC90Om7Up7z1KZq7t3flU8pg2MGjp88nJA-quNPQigkX_EmZ7516zeLVNJbbNRF5ko_0Y',
    ingredients: [
      '200g de calabaza dulce de temporada, pelada y troceada',
      '120g de zanahoria (aprox. 1 grande), pelada y rebanada',
      '180g de patata blanca (aprox. 1 mediana-grande), pelada y picada',
      '500ml de agua mineral filtrada (lo justo para cubrir los vegetales)',
      '1 cucharadita de postre de aceite de oliva virgen extra',
      '1/2 cucharadita de cúrcuma pura en polvo (potente desinflamatorio intestinal)',
      'Una pizca pequeña de sal de roca o sal marina'
    ],
    steps: [
      { title: '1. Hervir con Cúrcuma', text: 'Coloca los 200g de calabaza, los 120g de zanahoria y los 180g de patata en una cazuela. Vierte los 500ml de agua filtrada de forma que cubra las verduras justo al ras. Añade la sal marina y la media cucharadita de cúrcuma antiinflamatoria.' },
      { title: '2. Cocinar Tapado', text: 'Lleva a ebullición a fuego alto, luego reduce el fuego a intensidad media-baja. Tapa la cazuela por completo y deja cocinar a fuego lento durante 18 minutos o hasta que todos los vegetales estén tan tiernos que se deshagan al tocarlos con un tenedor.' },
      { title: '3. Batido a Textura de Seda', text: 'Vierte todos los ingredientes calientes (vegetales y su propio caldo alcalino rico en minerales) en una licuadora o utiliza una batidora de mano. Procesa a potencia máxima durante 2 minutos continuados para incorporar aire y lograr una crema aterciopelada perfecta.' },
      { title: '4. Servir Templado', text: 'Vierte la crema de rescate vegetal en un tazón hondo. Termina coronando el plato con un fino hilo de aceite de oliva virgen extra crudo (la grasa saludable ayuda a absorber los betacarotenos de las verduras). Toma despacio.' }
    ]
  },
  fallback: {
    id: 'fallback',
    title: 'Cena Suave Personalizada de Rescate',
    description: 'Una combinación reparadora y libre de irritantes adaptada exclusivamente con tus ingredientes de despensa.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC_food_generic_placeholder',
    ingredients: [
      'Tus ingredientes seleccionados de despensa (Bases, Vegetales o Proteínas)',
      '1 cucharadita de aceite de oliva virgen extra (añadido al final)',
      '400-600ml de agua para el proceso de cocción lenta',
      'Una pizca muy pequeña de sal marina'
    ],
    steps: [
      { title: '1. Preparación al Vapor o Hervido', text: 'Cocina los ingredientes elegidos (cortados muy finamente) mediante un hervido prolongado o al vapor suave. Es crucial cocinar a fuego lento para suavizar las fibras vegetales.' },
      { title: '2. Controlar la Textura', text: 'Asegúrate de triturar o machacar muy bien los vegetales. Las preparaciones líquidas, caldosas o en puré reducen drásticamente el trabajo digestivo estomacal.' },
      { title: '3. Reposo Integral', text: 'Deja entibiar la comida durante unos 5 minutos. Las temperaturas templadas son neutras y evitan el shock térmico en las paredes de tu estómago sensible.' },
      { title: '4. Ingesta Consciente', text: 'Añade una pequeña cucharadita de aceite de oliva en crudo sobre el plato finalizado. Mastica minuciosamente y evita beber abundante agua fría durante la cena.' }
    ]
  }
};

export const INITIAL_LOGS: LogEntry[] = [
  {
    id: 'log-1',
    date: '2026-06-29T20:30:00.000Z',
    type: 'Masaje de Activación',
    label: 'Masaje Intestinal',
    intensityBefore: 7,
    intensityAfter: 3,
    notes: 'Gran alivio, expulsión de gases y menor distensión después de terminar el ciclo.',
    relief: 45,
    dateStr: 'Ayer, 08:30 PM • Inflamación Media'
  },
  {
    id: 'log-2',
    date: '2026-06-25T14:15:00.000Z',
    type: 'Rescate Intensivo',
    label: 'Protocolo Completo',
    intensityBefore: 9,
    intensityAfter: 2,
    notes: 'Dolor y pesadez muy elevados por comida copiosa rápida. El elixir de jengibre obró milagros.',
    relief: 72,
    dateStr: '15 Oct • Pesadez Extrema'
  },
  {
    id: 'log-3',
    date: '2026-06-24T18:00:00.000Z',
    type: 'Postura de Alivio',
    label: 'Postura Apanasana',
    intensityBefore: 6,
    intensityAfter: 4,
    notes: 'Molestias por acumulación de gases. Apanasana liberó gran parte de la tensión.',
    relief: 30,
    dateStr: '14 Oct • Gas y Tensión'
  }
];
