import React from 'react';

export function BioWalkthrough() {
  return (
    <div className="text-sm leading-loose text-muted-foreground">
      <p>Na stranici za uređivanje profila pokojnika, možete uraditi sledeće:</p>
      <ol className="list-decimal list-inside space-y-1 mt-2">
        <li>
          <strong>Fotografija:</strong> Kliknite na fotografiju da biste je promenili ili dodali novu.
        </li>
        <li>
          <strong>Osnovni podaci:</strong> Unesite ili izmenite ime, prezime, datume (rođenja i smrti), i mesta (rođenja i smrti).
        </li>
        <li>
          <strong>Sačuvajte izmene:</strong> Kliknite na <em>Sačuvaj izmene na profilu</em> da biste potvrdili sve promene i nastavili sa uređivanjem biografije.
        </li>
      </ol>
    </div>
  );
}
