import { useState } from 'react';
import {
  CookingPot,
  Sparkles,
  Leaf,
  Sprout,
  Egg,
  Fish,
  Utensils,
  Timer,
  CheckCircle,
  Activity
} from 'lucide-react';
import { DiagnosticData, Recipe } from '../types';
import { RECIPES } from '../data';

interface RescueRecipesStepProps {
  diagnosticData: DiagnosticData | null;
  onNavigateHome: () => void;
  onFinalizeRescue: () => void;
}

export default function RescueRecipesStep({
  diagnosticData,
  onNavigateHome,
  onFinalizeRescue
}: RescueRecipesStepProps) {
  const [pantryIngredients, setPantryIngredients] = useState<string[]>([]);

  const togglePantryIngredient = (ing: string) => {
    if (pantryIngredients.includes(ing)) {
      setPantryIngredients(pantryIngredients.filter((i) => i !== ing));
    } else {
      setPantryIngredients([...pantryIngredients, ing]);
    }
  };

  const getPantryRecipe = (): Recipe => {
    const hasPollo = pantryIngredients.includes('pollo');
    const hasArroz = pantryIngredients.includes('arroz');
    const hasZanahoria = pantryIngredients.includes('zanahoria');
    const hasPescado = pantryIngredients.includes('pescado');
    const hasPatata = pantryIngredients.includes('patata');
    const hasCalabaza = pantryIngredients.includes('calabaza');

    // 1. Pollo + Arroz + Zanahoria
    if (hasPollo && hasArroz && hasZanahoria) {
      return RECIPES.pollo_arroz_zanahoria;
    }
    // 2. Pescado + Patata + Calabaza
    if (hasPescado && hasPatata && hasCalabaza) {
      return RECIPES.pescado_patata_calabaza;
    }
    // 3. Arroz + Zanahoria + Patata
    if (hasArroz && hasZanahoria && hasPatata) {
      return RECIPES.arroz_zanahoria_patata;
    }
    // 4. Sólo Verduras (Calabaza, Zanahoria, Patata/Papa)
    if (hasCalabaza && hasZanahoria && hasPatata) {
      return RECIPES.calabaza_zanahoria_patata;
    }
    // 5. Sólo Verduras combinadas (sin proteínas ni cereales)
    if (!hasPollo && !hasPescado && !hasArroz && (
      (hasCalabaza && hasZanahoria) || 
      (hasCalabaza && hasPatata) || 
      (hasZanahoria && hasPatata)
    )) {
      return RECIPES.calabaza_zanahoria_patata;
    }

    return RECIPES.fallback;
  };

  const activeRecipe = getPantryRecipe();

  const getRecipeProteinIcon = (iconName: string) => {
    if (iconName === 'Egg') return <Egg className="w-4 h-4 text-white" />;
    return <Fish className="w-4 h-4 text-white" />;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="font-display font-bold text-2xl text-primary mb-1">
          Paso 5: Comida de Rescate
        </h2>
        <p className="text-on-surface-variant text-sm">
          Selecciona los ingredientes simples que tienes a mano para crear una cena ultra-ligera y segura para el estómago.
        </p>
      </div>

      {/* Ingredient Selector Form */}
      <div className="space-y-5">
        <h3 className="font-sans font-bold text-primary text-xs uppercase tracking-wider mb-1">
          ¿Qué tienes en tu despensa?
        </h3>

        {/* Bases */}
        <div className="space-y-2.5">
          <span className="text-xs font-semibold text-on-surface-variant block">Bases</span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => togglePantryIngredient('arroz')}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                pantryIngredients.includes('arroz')
                  ? 'bg-primary text-white border-primary shadow-sm scale-[1.02]'
                  : 'bg-white border-primary/10 hover:border-primary/20'
              }`}
            >
              <CookingPot className="w-6 h-6 mb-2 opacity-85" />
              <span className="text-xs font-semibold">Arroz</span>
            </button>

            <button
              onClick={() => togglePantryIngredient('patata')}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                pantryIngredients.includes('patata')
                  ? 'bg-primary text-white border-primary shadow-sm scale-[1.02]'
                  : 'bg-white border-primary/10 hover:border-primary/20'
              }`}
            >
              <Sparkles className="w-6 h-6 mb-2 opacity-85" />
              <span className="text-xs font-semibold">Patata / Papa</span>
            </button>
          </div>
        </div>

        {/* Vegetales */}
        <div className="space-y-2.5">
          <span className="text-xs font-semibold text-on-surface-variant block">Vegetales</span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => togglePantryIngredient('calabaza')}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                pantryIngredients.includes('calabaza')
                  ? 'bg-primary text-white border-primary shadow-sm scale-[1.02]'
                  : 'bg-white border-primary/10 hover:border-primary/20'
              }`}
            >
              <Leaf className="w-6 h-6 mb-2 opacity-85" />
              <span className="text-xs font-semibold">Calabaza</span>
            </button>

            <button
              onClick={() => togglePantryIngredient('zanahoria')}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                pantryIngredients.includes('zanahoria')
                  ? 'bg-primary text-white border-primary shadow-sm scale-[1.02]'
                  : 'bg-white border-primary/10 hover:border-primary/20'
              }`}
            >
              <Sprout className="w-6 h-6 mb-2 opacity-85" />
              <span className="text-xs font-semibold">Zanahoria</span>
            </button>
          </div>
        </div>

        {/* Proteínas */}
        <div className="space-y-2.5">
          <span className="text-xs font-semibold text-on-surface-variant block">Proteínas</span>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => togglePantryIngredient('pollo')}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                pantryIngredients.includes('pollo')
                  ? 'bg-primary text-white border-primary shadow-sm scale-[1.02]'
                  : 'bg-white border-primary/10 hover:border-primary/20'
              }`}
            >
              <Egg className="w-6 h-6 mb-2 opacity-85" />
              <span className="text-xs font-semibold">Pollo</span>
            </button>

            <button
              onClick={() => togglePantryIngredient('pescado')}
              className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                pantryIngredients.includes('pescado')
                  ? 'bg-primary text-white border-primary shadow-sm scale-[1.02]'
                  : 'bg-white border-primary/10 hover:border-primary/20'
              }`}
            >
              <Fish className="w-6 h-6 mb-2 opacity-85" />
              <span className="text-xs font-semibold">Pescado</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recipe Recommendation Card */}
      {pantryIngredients.length >= 2 ? (
        <div className="glass-card rounded-2xl overflow-hidden shadow-sm border border-primary/10 mt-6 animate-fade-in">
          <div className="h-44 relative overflow-hidden">
            <img
              src={activeRecipe.image}
              alt={activeRecipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="bg-primary text-white text-[9px] px-2.5 py-0.5 rounded-full uppercase font-bold tracking-widest inline-block">
                  Safe-Food Recomendado
                </span>
                {activeRecipe.protein && (
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md text-white text-[9px] px-2 py-0.5 rounded-full">
                    {getRecipeProteinIcon(activeRecipe.protein.icon)}
                    <span className="font-bold">{activeRecipe.protein.label}</span>
                  </div>
                )}
              </div>
              <h4 className="text-white font-display font-bold text-xl">
                {activeRecipe.title}
              </h4>
            </div>
          </div>

          <div className="p-5 space-y-4">
            <p className="text-primary font-semibold text-xs leading-relaxed">
              {activeRecipe.description}
            </p>

            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-semibold">
                <Timer className="w-4 h-4 text-primary" />
                <span>15-20 min</span>
              </div>
              <div className="flex items-center gap-1.5 text-on-surface-variant text-xs font-semibold">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Digestión Fácil</span>
              </div>
            </div>

            {activeRecipe.ingredients && activeRecipe.ingredients.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-primary/10">
                <h5 className="font-sans font-bold text-xs text-on-surface uppercase tracking-wider mb-2">
                  Ingredientes y Cantidades:
                </h5>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 pl-1">
                  {activeRecipe.ingredients.map((ing, idx) => (
                    <li key={idx} className="text-[11px] text-on-surface-variant flex items-start gap-1.5 font-medium leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-3 pt-2 border-t border-primary/10">
              <h5 className="font-sans font-bold text-xs text-on-surface uppercase tracking-wider mb-2">
                Preparación paso a paso:
              </h5>
              {activeRecipe.steps.map((step, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-container text-primary font-bold text-xs flex items-center justify-center">
                    {index + 1}
                  </div>
                  <div>
                    <p className="font-sans font-bold text-xs text-on-surface">
                      {step.title}
                    </p>
                    <p className="text-[11px] text-on-surface-variant leading-relaxed">
                      {step.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Confirm/submit buttons */}
            <div className="space-y-2.5 pt-4">
              <button
                onClick={onNavigateHome}
                className="w-full bg-primary text-white py-3.5 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 shadow-md active:scale-95 transition-transform"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Entendido, voy a cocinar</span>
              </button>

              <button
                onClick={onFinalizeRescue}
                className="w-full bg-secondary-container hover:bg-[#abcdcd] text-on-secondary-container py-3.5 rounded-xl font-display font-bold text-sm flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform"
              >
                <Activity className="w-4 h-4" />
                <span>Finalizar y Evaluar Alivio</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="text-center py-10 glass-card rounded-2xl border-dashed border-2 border-outline-variant/30 mt-6 animate-fade-in">
          <Utensils className="w-12 h-12 text-outline-variant mx-auto mb-3 animate-bounce" />
          <p className="text-on-surface-variant font-sans font-semibold text-xs leading-relaxed px-6">
            Selecciona 2 o más ingredientes de la despensa para ver tu receta recomendada de bajo impacto.
          </p>
        </div>
      )}
    </div>
  );
}
