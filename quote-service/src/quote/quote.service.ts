import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Quote} from './quote.entity';
import {CreateQuoteDto, UpdateQuoteDto} from './quote.dto';
import {Vehicle} from 'src/vehicle/vehicle.entity';
import {VehicleService} from 'src/vehicle/vehicle.service';
import {WinstonModule} from "nest-winston";
import {format, transports} from "winston";

@Injectable()
export class QuoteService {
    private logger = null;

    constructor(
        @InjectRepository(Quote)
        private quoteRepository: Repository<Quote>,
        private readonly vehicleService: VehicleService,
    ) {
        this.logger = WinstonModule.createLogger({
            transports: [
                new transports.File({
                    level: 'debug',
                    filename: 'logs/debug.log',
                    format: format.combine(format.timestamp(), format.json()),
                }),
                new transports.File({
                    level: 'error',
                    filename: 'logs/error.log',
                    format: format.combine(format.timestamp(), format.json()),
                }),
                new transports.Console({
                    format: format.combine(
                        format.colorize({message: true}),
                    )
                }),
            ]
        });
    }

    async createQuote(quoteDto: CreateQuoteDto): Promise<Quote> {
        // Find the vehicle by its ID
        const vehicle = await this.vehicleService.getVehicleById(
            quoteDto.vehicleId,
        );

        // Check if the vehicle exists
        if (!vehicle) {
            this.logger.error("createQuote error : Vehicle not found => " + JSON.stringify(quoteDto), "error");
            throw new Error('Vehicle not found');
        }

        // Create a new quote and assign the vehicle to it
        const newQuote = this.quoteRepository.save({
            ...quoteDto,
            vehicle,
        });

        return newQuote;
    }

    async getQuotes(): Promise<Quote[]> {
        this.logger.debug("debug", "getQuotes");
        return this.quoteRepository
            .createQueryBuilder('quote')
            .leftJoinAndSelect('quote.vehicle', 'vehicle')
            .getMany();
    }

    async getQuoteById(id: string): Promise<Quote> {
        let quote = null;
        try {
            quote = this.quoteRepository
                .createQueryBuilder('quote')
                .leftJoinAndSelect('quote.vehicle', 'vehicle')
                .where('quote.id = :id', {id})
                .getOne();
        }
        catch (e) {
            this.logger.error("getQuoteById => Error Quote ID " + id + " not found", "error");
            throw new Error('Quote not found');
        }

        this.logger.debug("debug", "getQuoteById => Quote ID " + id);

        return quote;
    }

    async getQuoteByIdUser(id: string): Promise<Quote> {
        return this.quoteRepository
            .createQueryBuilder('quote')
            .leftJoinAndSelect('quote.vehicle', 'vehicle')
            .where('quote.id = :id', {id})
            .select([
                'quote.id',
                'quote.insuranceType',
                'quote.coverage',
                'quote.insurancePremium',
                'quote.coverageDuration',
                'quote.createdAt',
                'quote.updatedAt',
                'quote.coverageStartDate',
                'vehicle.id',
                'vehicle.vehicleType',
                'vehicle.brand',
                'vehicle.model',
                'vehicle.horsepower',
                'vehicle.licensePlate',
                'vehicle.licenseObtainedDate',
                'vehicle.vehicleCirculationDate',
                'vehicle.registrationCardDate',
                'vehicle.registrationCardHolder',
                'vehicle.purchaseMode',
                'vehicle.parkingPostalCode',
                'vehicle.annualMileage'
            ])
            .getOne();
    }

    async getQuotesByUserId(userId: string): Promise<Quote[]> {
        return this.quoteRepository.find({
            where: {userId: userId},
            select: [
                'id',
                'insuranceType',
                'coverage',
                'insurancePremium',
                'coverageDuration',
                'createdAt',
                'updatedAt',
                'coverageStartDate',
            ],
            relations: ['vehicle'],
        });
    }


    async updateQuote(id: string, quoteDto: UpdateQuoteDto): Promise<Quote> {
        this.logger.log("debug", "updateQuote => insuranceType " + quoteDto.insuranceType);
        const fieldName = 'id';
        await this.quoteRepository.update({[fieldName]: id}, quoteDto);
        return this.quoteRepository.findOneBy({id: id});
    }

    async deleteQuote(id: string): Promise<void> {
        this.logger.log("debug", "deleteQuote => Quote ID " + id);
        const quote = await this.quoteRepository.findOneBy({id: id});
        if (quote) {
            await this.quoteRepository.delete({id: quote.id, quoteNumber: quote.quoteNumber});
        }
        this.logger.error("deleteQuote => Error Quote ID " + id + " not found", "error");
    }

}
