<?php

namespace App\DataFixtures;

use App\Entity\Product;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Common\DataFixtures\DependentFixtureInterface;
use Doctrine\Persistence\ObjectManager;

use App\Entity\Categorie;

class ProductFixtures extends Fixture implements DependentFixtureInterface
{
    public function load(ObjectManager $manager): void
    {
        for ($i = 1; $i <= 5; $i++) {
            $product = new Product();
            $product->setTitle('Produit N° ' . $i);
            $product->setPrice(mt_rand(10, 100));
            $product->setDescription("Test description");
            $product->setFeatures("Test features");
            $product->setImage("https://picsum.photos/400?random=$i");
            $product->setNotice(5);

            $categorie = $this->getReference('categorie_' . mt_rand(1, 3), Categorie::class);
            $product->setCategorie($categorie);

            $manager->persist($product);
        }

        $manager->flush();
    }

    public function getDependencies(): array
    {
        return [
            CategorieFixtures::class,
        ];
    }
}
