export function transformImageUrl(products: any[], baseUrl: string): any[] {
  return products.map((product: any) => ({
    ...product,
    images: product.images.map((img: { image_url: string }) => ({
      ...img,
      image_url: `${baseUrl}/${img.image_url.replace(/\\/g, '/')}`,
    })),
  }));
}
