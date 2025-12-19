<?php

namespace App\Controller;

use App\Entity\Product;
use App\Entity\Categorie;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

final class ProductController extends AbstractController
{
    // ==============================
    // CREATE PRODUCT (multipart)
    // ==============================
    #[Route('/api/products', name: 'api_products_create', methods: ['POST'])]
    public function create(
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger
    ): JsonResponse {
        $title = $request->request->get('title', '');
        $price = $request->request->get('price');
        $description = $request->request->get('description', '');
        $features = $request->request->get('features', '');
        $notice = $request->request->get('notice');
        $categorieIRI = $request->request->get('categorie');

        $violations = [];

        if (!is_numeric($price) || $price < 0) {
            $violations[] = ['propertyPath' => 'price', 'message' => 'Prix invalide'];
        }

        if (!is_numeric($notice) || $notice < 0) {
            $violations[] = ['propertyPath' => 'notice', 'message' => 'Notice invalide'];
        }

        if (!preg_match('#/api/categories/(\d+)$#', $categorieIRI, $m)) {
            $violations[] = ['propertyPath' => 'categorie', 'message' => 'Catégorie invalide'];
        }

        $categorie = $em->getRepository(Categorie::class)->find((int)$m[1] ?? 0);
        if (!$categorie) {
            $violations[] = ['propertyPath' => 'categorie', 'message' => 'Catégorie introuvable'];
        }

        if ($violations) {
            return new JsonResponse([
                'hydra:title' => 'Validation failed',
                'violations' => $violations
            ], 400);
        }

        // Image
        $imageFile = $request->files->get('image');
        if (!$imageFile) {
            return new JsonResponse(['error' => 'Image requise'], 400);
        }

        $safeName = $slugger->slug(pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME));
        $imageName = $safeName.'-'.uniqid().'.'.$imageFile->guessExtension();

        $imageFile->move(
            $this->getParameter('kernel.project_dir').'/public/uploads/products',
            $imageName
        );

        $product = (new Product())
            ->setTitle($title)
            ->setPrice((float)$price)
            ->setDescription($description)
            ->setFeatures($features)
            ->setNotice((int)$notice)
            ->setCategorie($categorie)
            ->setImage($imageName);

        $em->persist($product);
        $em->flush();

        return new JsonResponse([
            'success' => true,
            'id' => $product->getId()
        ], 201);
    }

    // ==============================
    // UPDATE PRODUCT (JSON ONLY)
    // ==============================
    #[Route('/api/products/{id}/edit', methods: ['POST'])]
    public function updateWithImage(
        Product $product,
        Request $request,
        EntityManagerInterface $em,
        SluggerInterface $slugger
    ): JsonResponse {

        if ($request->request->has('title')) {
            $product->setTitle($request->request->get('title'));
        }

        if ($request->request->has('price')) {
            $product->setPrice((float)$request->request->get('price'));
        }

        if ($request->request->has('description')) {
            $product->setDescription($request->request->get('description'));
        }

        if ($request->request->has('features')) {
            $product->setFeatures($request->request->get('features'));
        }

        if ($request->request->has('notice')) {
            $product->setNotice((int)$request->request->get('notice'));
        }

        if ($request->request->has('categorie') &&
            preg_match('#/api/categories/(\d+)$#', $request->request->get('categorie'), $m)
        ) {
            if ($categorie = $em->getRepository(Categorie::class)->find((int)$m[1])) {
                $product->setCategorie($categorie);
            }
        }

        $file = $request->files->get('image');

        if ($file) {
            $safeName = $slugger->slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME));
            $ext = $file->guessExtension() ?? 'jpg';
            $fileName = $safeName.'-'.uniqid().'.'.$ext;

            $file->move(
                $this->getParameter('kernel.project_dir').'/public/uploads/products',
                $fileName
            );

            $product->setImage($fileName);
        }

        $em->flush();

        return new JsonResponse([
            'success' => true,
            'imageUpdated' => $file !== null
        ]);
    }


    #[Route('/api/products/{id}', methods: ['DELETE'])]
    public function delete(
        Product $product,
        EntityManagerInterface $em
    ): JsonResponse {

        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $em->remove($product);
        $em->flush();

        return new JsonResponse(['success' => true]);
    }
}
