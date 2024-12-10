import React from 'react'

export function StoryWalkthrough() {
  return (
    <div className="text-sm leading-loose text-muted-foreground">
      <p>Na stranici za uređivanje priče pokojnika, dostupno je polje za unos naslova priče i teksta:</p>
      <ol className="list-decimal list-inside space-y-2 mt-2">
        <li><strong>Dugme za dodavanje nove Priče:</strong> Kliknite dugme <em>Dodaj novu priču</em> da biste dodali novi prozor koji predstavlja jednu priču.</li>
        <li><strong>U delu za naslov dodajte naslov priče:</strong> Unesite kratak i upečatljiv naslov koji opisuje priču.</li>
        <li><strong>U delu za tekst priče napišite kratak tekst o nekoj zanimljivoj priči pokojnika:</strong> Ovo može biti anegdota, važan životni događaj ili nešto što je karakteristično za pokojnika.</li>
        <li><strong>Dugme za čuvanje nove Priče:</strong> Kliknite dugme <em>Sačuvaj priču</em> da biste sačuvali novu priču.</li>
        <li><strong>Uređivanje postojećih priča:</strong> Možete uređivati ili brisati postojeće priče koristeći opcije dostupne uz svaku priču.</li>
      </ol>
      <p className="mt-2">Zapamtite, cilj je ispričati zanimljive i značajne priče koje će pomoći u očuvanju sećanja na pokojnika.</p>
    </div>
  )
}

