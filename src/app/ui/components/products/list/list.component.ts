import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseUrl } from 'src/app/contracts/base-url';
import { List_Product } from 'src/app/contracts/list_product';
import { FileService } from 'src/app/services/common/model/file.service';
import { ProductService } from 'src/app/services/common/model/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private fileService: FileService,
    private router: Router
  ) {}

  currentPageNo: number;
  totalProductCount: number;
  totalPageCount: number;
  pageSize: number = 15;
  pageList: number[] = [];
  baseUrl: BaseUrl;

  products: List_Product[];
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.activatedRoute.queryParams.subscribe(async (x) => {
      if (x.pageNo) {
        this.currentPageNo = +x.pageNo;
      } else {
        this.currentPageNo = 1;
      }

      console.log(this.currentPageNo);
      const data: { totalProductCount: number; products: List_Product[] } =
        await this.productService.read(
          this.currentPageNo - 1,
          this.pageSize,
          () => {},
          (errorMessage) => {}
        );
      console.log(this.totalProductCount);
      this.products = data.products;
      console.log(this.products);

      this.products = this.products.map<List_Product>((p) => {
        const listProduct: List_Product = {
          id: p.id,
          createdDate: p.createdDate,
          imagePath: p.productImageFiles.length
            ? p.productImageFiles.find((p) => p.showcase).path
            : '',
          name: p.name,
          price: p.price,
          stock: p.stock,
          updatedDate: p.updatedDate,
          productImageFiles: p.productImageFiles,
        };

        return listProduct;
      });

      this.totalProductCount = data.totalProductCount;
      this.totalPageCount = Math.ceil(this.totalProductCount / this.pageSize);

      this.pageList = [];
      if (this.totalPageCount < 5) {
      } else {
        if (this.currentPageNo < 4) {
          for (let i = 1; i <= 5; i++) this.pageList.push(i);
        } else {
          const temp =
            this.totalPageCount - this.currentPageNo < 2
              ? this.totalPageCount - this.currentPageNo
              : 2;
          for (
            let i = this.currentPageNo - 2;
            i <= this.currentPageNo + temp;
            i++
          ) {
            this.pageList.push(i);
          }
        }
      }
    });
  }
}
