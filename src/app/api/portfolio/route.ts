import { ApiResponse } from "@/lib/server/api-response";
import { PortfolioService } from "@/lib/server/portfolio-service";

export async function GET() {
  const fullPortfolio = PortfolioService.getFullPortfolio();

  return ApiResponse.success(fullPortfolio, 200, {
    cached: true,
    ttlSeconds: 3600,
  });
}
