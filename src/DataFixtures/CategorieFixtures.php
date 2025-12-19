<?php

namespace App\DataFixtures;

use App\Entity\Categorie;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class CategorieFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 3; $i++) {
            $categorie = new Categorie();
            $categorie->setTitle("Categorie N° $i");

            $manager->persist($categorie);

            $this->addReference("categorie_$i", $categorie);
        }

        $manager->flush();
    }
}
