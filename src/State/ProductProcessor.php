<?php
namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\String\Slugger\SluggerInterface;

final class ProductProcessor implements ProcessorInterface
{
    public function __construct(
        private EntityManagerInterface $em,
        private RequestStack $requestStack,
        private SluggerInterface $slugger,
        private string $projectDir // ✅ ICI
    ) {}

    public function process(
        mixed $data,
        Operation $operation,
        array $uriVariables = [],
        array $context = []
    ): mixed {
        if (!$data instanceof Product) {
            return $data;
        }

        $request = $this->requestStack->getCurrentRequest();

        if ($request && $request->files->get('image')) {
            $file = $request->files->get('image');

            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $safeName = $this->slugger->slug($originalName);
            $filename = $safeName.'-'.uniqid().'.'.$file->guessExtension();

            // ✅ PLUS DE getParameter()
            $file->move(
                $this->projectDir.'/public/uploads/products',
                $filename
            );

            $data->setImage($filename);
        }

        $this->em->persist($data);
        $this->em->flush();

        return $data;
    }
}
