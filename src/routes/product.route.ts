import type { FastifyInstance } from "fastify";
import { createProductHandler, deleteProductHandler, getAllProductHandler, getProductByIdHandler, getProductByOwnerIdHandler, updateProductHandler } from "../controller/product.controller.js";
import { $ref } from "../schema/product.schema.js";
import z from "zod";

async function productRoutes(server: FastifyInstance) {
    
     server.post("/",
        {
            preHandler: [server.authenticate],
            schema: {
                body: $ref("createProductSchema"),
                response: {
                    201: $ref("productResponseSchema")
                }
            }
        }, 
        createProductHandler
        ),
        server.patch(
        "/:id",
        {
            preHandler: [server.authenticate],
            schema: {
            params: $ref("updateProductParamsSchema"),
            body: $ref("updateProductBodySchema"),
            response: {
                200: $ref("productResponseSchema"),
            },
            },
        },
        updateProductHandler
        );
        server.delete(
        "/:id",
        {
            preHandler: [server.authenticate],
            schema: {
            params: $ref("updateProductParamsSchema"),
            },
        },
        deleteProductHandler
        );

      server.get("/", 
        {
            
        }, 
        getAllProductHandler)  ,

      server.get("/:id", 
        {
         preHandler: [server.authenticate],
        }, 
        getProductByIdHandler),

      server.get("/owner/:ownerId", 
        {
         preHandler: [server.authenticate],
          schema: {
                response: {
                    201: $ref("allProductResponseSchema")
                }
            }
        }, 
        getProductByOwnerIdHandler)   

        
}


export default productRoutes;